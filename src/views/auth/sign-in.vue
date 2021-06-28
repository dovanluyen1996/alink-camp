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
          <custom-submit @click="signIn">
            ログイン
          </custom-submit>
          <v-ons-button
            modifier="quiet"
            class="go-to-password-reminder"
            @click="goToPasswordReminder"
          >
            パスワードを忘れた方はこちら
          </v-ons-button>
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
// components
import BaseForm from '@/components/organisms/form/base-form';
import UserEmail from '@/components/organisms/user/user-email';
import UserPassword from '@/components/organisms/user/user-password';
import CustomSubmit from '@/components/organisms/form/custom-submit';
import SocialLogin from '@/components/organisms/social-login';
import ErrorDialog from '@/components/organisms/error-dialog';

// pages
import PasswordReminder from '@/views/auth/password-reminder';
import UserStampsCampaign from '@/views/user/user-stamps/campaign';

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
      default:
        return 'ログインに失敗しました';
      }
    },
  },
  methods: {
    goToPasswordReminder() {
      this.$store.dispatch('appNavigator/push', PasswordReminder);
    },
    signIn() {
      this.$cognito.login(this.user.email, this.user.password)
        .then(async(result) => {
          console.log(result);
          this.$store.dispatch('appNavigator/push', UserStampsCampaign);
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
  margin-top: 10px;
}

.form {
  margin-bottom: 40px;
}
</style>
