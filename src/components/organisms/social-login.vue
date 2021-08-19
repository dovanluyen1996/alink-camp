<template>
  <div class="social-login">
    <loading :visible="isLoading" />
    <div class="social-login-title">
      {{ title }}
    </div>
    <v-ons-card
      v-for="(service, index) in services"
      :key="index"
      @click="signIn(service.name)"
    >
      <img
        :src="service.image"
        class="social-login-image"
      >
      <div class="social-login-name">
        {{ service.name }}
      </div>
    </v-ons-card>

    <error-dialog
      title="ログインに失敗しました"
      :is-visible="signInErrorVisible"
      error-message="ログインに失敗しました"
      @close="closeSignInError"
    />
  </div>
</template>

<script>
import ErrorDialog from '@/components/organisms/error-dialog';
import CheckCompleteRegistration from '@/mixins/checkCompleteRegistration';

const GoogleImage = require('@/assets/images/social/google.png');
const FacebookImage = require('@/assets/images/social/facebook.png');

export default {
  name: 'SocialLogin',
  components: {
    ErrorDialog,
  },
  mixins: [CheckCompleteRegistration],
  props: {
    title: {
      type: String,
      default: '他サービスでログイン',
    },
  },
  data() {
    return {
      services: [
        {
          name: 'Google',
          image: GoogleImage,
        },
        {
          name: 'Facebook',
          image: FacebookImage,
        },
      ],
      signInErrorVisible: false,
      isLoading: false,
    };
  },
  created() {
    this.addHandleOpenUrlAfterLogin();
  },
  methods: {
    signIn(provider) {
      const domain = process.env.COGNITO_USER_POOL_DOMAIN;
      const clientId = process.env.COGNITO_CLIENT_ID;
      const type = process.env.COGNITO_RESPONSE_TYPE;
      const callback = process.env.COGNITO_CALLBACK_URL;
      const scope = process.env.COGNITO_OAUTH_SCOPES;
      const providerUrl = `${domain}/authorize?identity_provider=${provider}&response_type=${type}&client_id=${clientId}&redirect_uri=${callback}&scope=${scope}`;

      window.open(providerUrl, '_system');
    },
    addHandleOpenUrlAfterLogin() {
      window.handleOpenURL = async(url) => {
        this.isLoading = true;
        const code = this.detectOauthCode(url);
        if (!code) {
          this.isLoading = false;
          return;
        }

        try {
          const oauthInfo = await this.$cognito.getOauthToken(code);
          const userInfo = await this.$cognito.getOauthUserInfo(oauthInfo.access_token);

          if (userInfo.email) {
            this.storeToken(userInfo, oauthInfo);
            this.checkBeforeGoToAppTabbar();
          } else {
            this.showSignInError();
          }
        } catch (err) {
          console.error(err);
          this.showSignInError();
        } finally {
          this.isLoading = false;
        }
      };
    },
    detectOauthCode(url) {
      const codeRegex = /(code=)([^,&,#,/]+)/ig;
      const code = url.match(codeRegex) && url.match(codeRegex)[0].split('=')[1];

      return code;
    },
    storeToken(userInfo, oauthInfo) {
      const userPoolKey = `CognitoIdentityServiceProvider.${process.env.COGNITO_CLIENT_ID}`;
      const userKey = `${userPoolKey}.${userInfo.username}`;

      localStorage.setItem(`${userKey}.accessToken`, oauthInfo.access_token);
      localStorage.setItem(`${userKey}.idToken`, oauthInfo.id_token);
      localStorage.setItem(`${userKey}.refreshToken`, oauthInfo.refresh_token);
      localStorage.setItem(`${userPoolKey}.LastAuthUser`, userInfo.username);
      localStorage.setItem('externalProviderSignIn', true);
    },
    showSignInError() {
      this.signInErrorVisible = true;
    },
    closeSignInError() {
      this.signInErrorVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_mixins.scss';

.social-login {
  display: flex;
  flex-wrap: wrap;
  margin-right: 13px;
  margin-left: 13px;
}

.social-login-title {
  @include title-style;

  width: 100%;
  margin-bottom: 30px;
}

.social-login-image {
  width: 32px;
  margin-bottom: 9px;
}

.card {
  width: calc(50% - 15px);
  padding: 10px 0 15px;
  margin: 0 7px 15px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
}
</style>
