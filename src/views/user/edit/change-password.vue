<template>
  <v-ons-page>
    <custom-toolbar title="データ引継ぎ設定" />
    <div class="content">
      <validation-observer v-slot="{ handleSubmit }">
        <base-form>
          <validation-provider
            v-slot="{ errors }"
            rules="required|password"
            name="今のパスワード"
          >
            <password-field
              v-model="oldPassword"
              title="今のパスワード"
              :errors="errors"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            rules="required|password"
            name="新しいパスワード"
          >
            <user-password-new
              v-model="newPassword"
              :errors="errors"
            />
          </validation-provider>
          <template #buttons>
            <custom-submit @click="handleSubmit(submitPassword)">
              変更
            </custom-submit>
          </template>
        </base-form>
      </validation-observer>
    </div>

    <error-dialog
      title="パスワードの変更に失敗しました"
      :is-visible="changePasswordErrorVisible"
      :error-message="errorMessage"
      @close="closeChangePasswordError"
    />
  </v-ons-page>
</template>

<script>
// components
import BaseForm from '@/components/organisms/form/base-form';
import UserPasswordNew from '@/components/organisms/user/user-password-new';
import CustomSubmit from '@/components/organisms/form/custom-submit';
import ErrorDialog from '@/components/organisms/error-dialog';
import PasswordField from '@/components/organisms/form/password-field';

// pages
import SignIn from '@/views/auth/sign-in';

export default {
  name: 'ChangePasswordView',
  components: {
    BaseForm,
    UserPasswordNew,
    CustomSubmit,
    ErrorDialog,
    PasswordField,
  },
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      error: '',
      changePasswordErrorVisible: false,
    };
  },
  computed: {
    errorMessage() {
      if (!this.error) return '';

      switch (this.error.code) {
      case 'NotAuthorizedException':
        return '今のパスワードが間違っています';
      case 'LimitExceededException':
        return 'Attempt limit exceeded, please try after some time';
      default:
        return 'パスワードの変更に失敗しました';
      }
    },
  },
  methods: {
    submitPassword() {
      this.$cognito.changePassword(this.oldPassword, this.newPassword)
        .then(() => {
          this.$store.dispatch('appNavigator/reset', SignIn);
        })
        .catch((err) => {
          this.error = err;
          this.showChangePasswordError();
        });
    },
    showChangePasswordError() {
      this.changePasswordErrorVisible = true;
    },
    closeChangePasswordError() {
      this.changePasswordErrorVisible = false;
    },
  },
};
</script>
