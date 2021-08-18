<template>
  <v-ons-page>
    <custom-toolbar title="パスワードを忘れた方" />
    <div class="content">
      <loading :visible="isLoading" />
      <validation-observer
        v-slot="{ handleSubmit }"
      >
        <base-form>
          <validation-provider
            v-slot="{ errors }"
            rules="required|email"
            name="メールアドレス"
          >
            <user-email
              v-model="user.email"
              :errors="errors"
            />
          </validation-provider>
          <template #buttons>
            <custom-submit @click="handleSubmit(sendComfirmCode)">
              認証コードを送信
            </custom-submit>
          </template>
        </base-form>
      </validation-observer>
    </div>

    <error-dialog
      title="認証コードの送信に失敗しました"
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
      isLoading: false,
    };
  },
  computed: {
    errorMessage() {
      if (!this.error) return '';

      switch (this.error.code) {
      case 'InvalidParameterException':
        return 'メールアドレスが不正です。';
      default:
        return '認証コードの送信に失敗しました';
      }
    },
  },
  methods: {
    sendComfirmCode() {
      this.isLoading = true;
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
        })
        .finally(() => {
          this.isLoading = false;
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
