<template>
  <v-ons-page>
    <custom-toolbar title="パスワードを忘れた方" />
    <div class="content">
      <base-form>
        <user-email v-model="user.email" />
        <template #buttons>
          <custom-submit @click="sendComfirmCode">
            認証コードを送信
          </custom-submit>
        </template>
      </base-form>
    </div>

    <error-dialog
      title="確認コードの送信に失敗しました"
      :is-visible="remindPasswordErrorVisible"
      :error-message="errorMessage"
      @close="closeRemindPasswordError"
    />
  </v-ons-page>
</template>

<script>
// components
import BaseForm from '@/components/organisms/form/base-form';
import UserEmail from '@/components/organisms/user/user-email';
import CustomSubmit from '@/components/organisms/form/custom-submit';
import ErrorDialog from '@/components/organisms/error-dialog';

// pages
import PasswordReset from '@/views/auth/password-reset';

export default {
  name: 'PasswordReminder',
  components: {
    BaseForm,
    UserEmail,
    CustomSubmit,
    ErrorDialog,
  },
  data() {
    return {
      user: {
        email: '',
      },
      error: null,
      remindPasswordErrorVisible: false,
    };
  },
  computed: {
    errorMessage() {
      if (!this.error) return null;

      switch (this.error.code) {
      case 'InvalidParameterException':
        return 'メールアドレスが不正です。';
      default:
        return '確認コードの送信に失敗しました';
      }
    },
  },
  methods: {
    sendComfirmCode() {
      this.$cognito.forgotPassword(this.user.email)
        .then((result) => {
          console.log(result);

          this.$store.dispatch('appNavigator/push', {
            extends: PasswordReset,
            onsNavigatorProps: {
              email: this.user.email,
            },
          });
        })
        .catch((err) => {
          this.error = err;
          this.showRemindPasswordError();
        });
    },
    showRemindPasswordError() {
      this.remindPasswordErrorVisible = true;
    },
    closeRemindPasswordError() {
      this.remindPasswordErrorVisible = false;
    },
  },
};
</script>
