<template>
  <v-ons-page>
    <custom-toolbar title="データを引き継ぐ" />
    <div class="content">
      <base-form>
        <user-email v-model="user.email" />
        <user-password
          v-model="user.password"
          :can-show-password="false"
          :has-help="false"
        />
        <template #buttons>
          <div>
            <custom-submit @click="signIn">
              ログイン
            </custom-submit>
          </div>
          <div>
            <v-ons-button
              modifier="white"
              class="go-to-password-reminder"
              @click="goToPasswordReminder"
            >
              パスワードを忘れた方はこちら
            </v-ons-button>
          </div>
        </template>
      </base-form>

      <social-login />
    </div>

    <error-dialog
      title="ログインに失敗しました"
      :is-visible="signInErrorVisible"
      :error-message="errorMessage"
      @close="closeSignInError"
    />
  </v-ons-page>
</template>

<script>
import CheckCompleteRegistration from '@/mixins/checkCompleteRegistration';

// components
import BaseForm from '@/components/organisms/form/base-form';
import UserEmail from '@/components/organisms/user/user-email';
import UserPassword from '@/components/organisms/user/user-password';
import CustomSubmit from '@/components/organisms/form/custom-submit';
import SocialLogin from '@/components/organisms/social-login';
import ErrorDialog from '@/components/organisms/error-dialog';

// pages
import PasswordReminder from '@/views/auth/password-reminder';
import ResendConfirmCode from '@/views/user/new/resend-confirm-code';

export default {
  name: 'SignIn',
  components: {
    BaseForm,
    UserEmail,
    UserPassword,
    CustomSubmit,
    SocialLogin,
    ErrorDialog,
  },
  mixins: [CheckCompleteRegistration],
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      error: null,
      signInErrorVisible: false,
    };
  },
  computed: {
    errorMessage() {
      if (!this.error) return '';

      switch (this.error.code) {
      case 'NotAuthorizedException':
        return 'メールアドレスまたはパスワードが違います。';
      case 'InvalidParameterException':
        return 'メールアドレスが不正です。';
      case 'UserNotConfirmedException':
        return 'ユーザーが認証されていません。';
      default:
        return 'ログインに失敗しました';
      }
    },
  },
  methods: {
    goToPasswordReminder() {
      this.$store.dispatch('appNavigator/push', PasswordReminder);
    },
    async signIn() {
      this.$cognito.login(this.user.email, this.user.password)
        .then(async(result) => {
          console.log(result);
          await this.$helpers.callPushNotificationPermission();
          await this.$helpers.callGeolocationPermission();
          await this.$helpers.createUserDevise();
          this.checkBeforeGoToAppTabbar();
        })
        .catch((err) => {
          this.error = err;
          this.showSignInError();
        });
    },
    showSignInError() {
      this.signInErrorVisible = true;
    },
    closeSignInError() {
      this.signInErrorVisible = false;

      if (this.isNotConfirmed()) {
        this.$store.dispatch('appNavigator/push', {
          extends: ResendConfirmCode,
          onsNavigatorProps: {
            email: this.user.email,
          },
        });
      }
    },
    isNotConfirmed() {
      return this.error.code === 'UserNotConfirmedException';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.password-field {
  /deep/ .card {
    margin-bottom: 15px;
  }
}

.go-to-password-reminder {
  margin-top: 23px;
}

.form {
  margin-bottom: 55px;
}
</style>
