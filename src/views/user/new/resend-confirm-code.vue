<template>
  <v-ons-page>
    <custom-toolbar title="認証コードを再送する" />
    <div class="content">
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
            <custom-submit @click="handleSubmit(resendConfirmationCode)">
              認証コードを再送する
            </custom-submit>
          </template>
        </base-form>
      </validation-observer>
    </div>

    <error-dialog
      title="認証コードの再送信に失敗しました"
      :is-visible="resendConfirmCodeErrorVisible"
      :error-message="errorMessage"
      @close="closeResendConfirmCodeError"
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
import ConfirmCode from '@/views/user/new/confirm-code';

export default {
  name: 'ResendConfirmCode',
  components: {
    BaseForm,
    UserEmail,
    CustomSubmit,
    ErrorDialog,
  },
  props: {
    email: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      user: {
        email: this.email,
      },
      error: null,
      resendConfirmCodeErrorVisible: false,
    };
  },
  computed: {
    errorMessage() {
      if (!this.error) return '';

      return '認証コードの再送信に失敗しました';
    },
  },
  methods: {
    resendConfirmationCode() {
      this.$cognito.resendConfirmationCode(this.user.email)
        .then((result) => {
          console.log(result);

          this.$store.dispatch('appNavigator/push', {
            extends: ConfirmCode,
            onsNavigatorProps: {
              email: this.user.email,
            },
          });
        })
        .catch((err) => {
          this.error = err;
          this.showResendConfirmCodeError();
        });
    },
    showResendConfirmCodeError() {
      this.resendConfirmCodeErrorVisible = true;
    },
    closeResendConfirmCodeError() {
      this.resendConfirmCodeErrorVisible = false;
    },
  },
};
</script>
