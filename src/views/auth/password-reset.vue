<template>
  <v-ons-page>
    <custom-toolbar title="パスワードを忘れた方" />
    <div class="content">
      <base-form>
        <auth-comfirm-code v-model="confirmCode" />
        <user-password-new v-model="newPassword" />
        <template #buttons>
          <custom-submit @click="submitPassword">
            設定する
          </custom-submit>
        </template>
      </base-form>
    </div>

    <error-dialog
      title="パスワードの変更に失敗しました"
      :is-visible="resetPasswordErrorVisible"
      :error-message="errorMessage"
      @close="closeResetPasswordError"
    />
  </v-ons-page>
</template>

<script>
// components
import BaseForm from '@/components/organisms/form/base-form';
import AuthComfirmCode from '@/components/organisms/auth/comfirm-code';
import UserPasswordNew from '@/components/organisms/user/user-password-new';
import CustomSubmit from '@/components/organisms/form/custom-submit';
import ErrorDialog from '@/components/organisms/error-dialog';

// pages
import SignIn from '@/views/auth/sign-in';

export default {
  name: 'PasswordReset',
  components: {
    BaseForm,
    AuthComfirmCode,
    UserPasswordNew,
    CustomSubmit,
    ErrorDialog,
  },
  props: {
    email: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {
      confirmCode: '',
      newPassword: '',
      error: '',
      resetPasswordErrorVisible: false,
    };
  },
  computed: {
    errorMessage() {
      if (!this.error) return '';

      switch (this.error.code) {
      case 'CodeMismatchException':
        return '認証コードが正しくありません';
      case 'InvalidParameterException':
        return '無効な認証コードまたはパスワードが違います。';
      default:
        return 'パスワードの変更に失敗しました';
      }
    },
  },
  methods: {
    submitPassword() {
      this.$cognito.confirmPassword(this.email, this.confirmCode, this.newPassword)
        .then((result) => {
          console.log(result);
          this.$store.dispatch('appNavigator/reset', SignIn);
        })
        .catch((err) => {
          this.error = err;
          this.showResetPasswordError();
        });
    },
    showResetPasswordError() {
      this.resetPasswordErrorVisible = true;
    },
    closeResetPasswordError() {
      this.resetPasswordErrorVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.password-new {
  margin-top: 45px;
  margin-bottom: 40px;
}
</style>
