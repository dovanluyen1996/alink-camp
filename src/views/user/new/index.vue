<template>
  <v-ons-page>
    <custom-toolbar title="ユーザー情報の登録" />
    <div class="content">
      <loading :visible="isLoading" />
      <validation-observer v-slot="{ handleSubmit }">
        <base-form>
          <validation-provider
            v-slot="{ errors }"
            rules="required|email"
            name="登録したいメールアドレス"
          >
            <user-email
              v-model="user.email"
              :errors="errors"
              title="登録したいメールアドレス"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            rules="required|password"
            name="登録したいパスワード"
          >
            <user-password
              v-model="user.password"
              :can-show-password="true"
              :errors="errors"
              title="登録したいパスワード"
            />
          </validation-provider>
          <template #buttons>
            <div>
              <custom-submit @click="handleSubmit(getConfirmCode)">
                認証コードを送信
              </custom-submit>
            </div>
            <div>
              <v-ons-button
                modifier="quiet"
                @click="goToResendConfirmCode"
              >
                認証コードを再送する
              </v-ons-button>
            </div>
          </template>
        </base-form>
      </validation-observer>

      <social-login title="他サービスで登録" />

      <error-dialog
        title="登録に失敗しました"
        :is-visible="otherErrorVisible"
        :error-message="errorMessage"
        @close="closeSignUpError"
      />

      <v-ons-alert-dialog
        :visible.sync="userExistsErrorVisible"
      >
        <template #title>
          登録に失敗しました
        </template>

        既に登録のあるメールアドレスです。認証コードを再送していただくか、アプリデータを引き継ぐよりログインをお試しください

        <template #footer>
          <v-ons-button
            @click="closeSignUpError"
          >
            OK
          </v-ons-button>
        </template>
      </v-ons-alert-dialog>

    </div>
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
import UerNewConfirmCode from '@/views/user/new/confirm-code';
import ResendConfirmCode from '@/views/user/new/resend-confirm-code';
import SignIn from '@/views/auth/sign-in';

export default {
  name: 'UserNew',
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
      signUpErrorVisible: false,
      isLoading: false,
    };
  },
  computed: {
    errorMessage() {
      if (!this.error) return '';

      switch (this.error.code) {
      case 'UsernameExistsException':
        return '指定されたメールアドレスのアカウントは既に存在します。';
      case 'InvalidPasswordException':
        return 'パスワードの条件を満たしていません。';
      default:
        return '登録に失敗しました';
      }
    },
    isUserExistsException() {
      return this.error && this.error.code === 'UsernameExistsException';
    },
    userExistsErrorVisible() {
      return this.signUpErrorVisible && this.isUserExistsException;
    },
    otherErrorVisible() {
      return this.signUpErrorVisible && !this.isUserExistsException;
    }
  },
  methods: {
    getConfirmCode() {
      localStorage.removeItem('authenticationData');
      this.isLoading = true;
      this.$cognito.signUp(this.user.email, this.user.password)
        .then(async(result) => {
          console.log(result);
          this.goToConfirmCode();
        })
        .catch((err) => {
          this.error = err;
          this.showSignUpError();
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    goToConfirmCode() {
      this.$store.dispatch('appNavigator/push', {
        extends: UerNewConfirmCode,
        onsNavigatorProps: {
          email: this.user.email,
        },
      });
    },
    goToResendConfirmCode() {
      this.$store.dispatch('appNavigator/push', {
        extends: ResendConfirmCode,
        onsNavigatorProps: {
          email: this.user.email,
        },
      });
    },
    goToSignIn() {
      this.closeSignUpError();
      this.$store.dispatch('appNavigator/push', SignIn);
    },
    showSignUpError() {
      this.signUpErrorVisible = true;
    },
    closeSignUpError() {
      this.signUpErrorVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  margin-bottom: 30px;
}

/deep/ .button--quiet {
  height: auto;
  margin-top: 25px;
  font-size: 18px;
  line-height: 18px;
}

.cancel-btn {
  margin-top: 0;
  font-size: 14px;
  line-height: 36px;
}
</style>
