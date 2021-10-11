<template>
  <div class="social-login">
    <loading :visible="isLoading" />
    <div class="social-login-title">
      {{ title }}
    </div>
    <v-ons-card
      v-for="(service, index) in services.filter(sv => isShowService(sv.name))"
      :key="index"
      @click="signIn(service.name)"
      :class="['social-login-card', service.modifierClass]"
    >
      <div class="social-login-name">
        <img
          :src="service.image"
          class="social-login-image"
        >
        {{ service.text }}
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
const AppleImage = require('@/assets/images/social/apple.png');

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
          name: 'SignInWithApple',
          text: 'Appleでサインイン',
          image: AppleImage,
          modifierClass: 'apple',
        },
        {
          name: 'Google',
          text: 'Googleでサインイン',
          image: GoogleImage,
          modifierClass: 'google',
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
      const callback = encodeURI(process.env.COGNITO_CALLBACK_URL);
      const scope = encodeURI(process.env.COGNITO_OAUTH_SCOPES);
      const providerUrl = `${domain}/authorize?response_mode=form_post&identity_provider=${provider}&response_type=${type}&client_id=${clientId}&redirect_uri=${callback}&scope=${scope}`;

      localStorage.setItem('externalProviderSignIn', true);
      window.SafariViewController.show({
        url: providerUrl,
      },
      (result) => {
        console.log(result);
      },
      (error) => {
        console.log(error);
        this.showSignInError();
      });
    },
    addHandleOpenUrlAfterLogin() {
      window.handleOpenURL = async(url) => {
        // Close SafariViewController after login success
        window.SafariViewController.hide();

        this.isLoading = true;
        const code = this.oauthCode(url);
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
    oauthCode(url) {
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
    },
    showSignInError() {
      this.signInErrorVisible = true;
    },
    closeSignInError() {
      this.signInErrorVisible = false;
    },
    isShowService(serviceName) {
      if (serviceName !== 'SignInWithApple') return true;

      return window.device && window.device.platform === 'iOS';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_mixins.scss';
@import '@/assets/scss/_variables.scss';

.social-login {
  display: flex;
  flex-wrap: wrap;
  margin-right: 13px;
  margin-left: 13px;

  .google {
    background-color: $color-google-blue;
  }

  .apple {
    background-color: black;
  }
}

.social-login-title {
  @include title-style;

  width: 100%;
  margin-bottom: 30px;
}

.social-login-card {
  width: 310px;
  padding: 15px 45px;
  margin: 10px auto;
  font-weight: 600;
  line-height: 1;
  border-radius: 10px;
}

.social-login-name {
  display: flex;
  align-items: center;
  font-size: 18px;
  color: white;
}

.social-login-image {
  width: 25px;
  margin-right: 10px;
}
</style>
