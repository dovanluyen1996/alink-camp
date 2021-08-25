<template>
  <v-ons-page>
    <custom-toolbar
      title="ユーザー情報の登録"
    />
    <div class="content">
      <loading :visible="isLoading" />
      <validation-observer v-slot="{ handleSubmit }">
        <base-form>
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="認証コード"
          >
            <auth-comfirm-code
              v-model="confirmCode"
              :errors="errors"
            />
          </validation-provider>
          <template #buttons>
            <custom-submit @click="handleSubmit(submitConfirmCode)">
              認証完了
            </custom-submit>
          </template>
        </base-form>
      </validation-observer>
    </div>

    <error-dialog
      title="認証エラー"
      :is-visible="confirmErrorVisible"
      :error-message="errorMessage"
      @close="closeConfirmError"
    />
  </v-ons-page>
</template>

<script>
// components
import BaseForm from '@/components/organisms/form/base-form';
import AuthComfirmCode from '@/components/organisms/auth/comfirm-code';
import CustomSubmit from '@/components/organisms/form/custom-submit';
import ErrorDialog from '@/components/organisms/error-dialog';

// pages
import UserData from '@/views/user/new/user-data';
import SignIn from '@/views/auth/sign-in';

export default {
  name: 'UserNewConfirmCode',
  components: {
    BaseForm,
    AuthComfirmCode,
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
      error: null,
      confirmErrorVisible: false,
      isLoading: false,
    };
  },
  computed: {
    errorMessage() {
      if (!this.error) return '';

      switch (this.error.code) {
      case 'NotAuthorizedException':
        return '既に登録済みのユーザです';
      default:
        return '認証コードが一致しません';
      }
    },
  },
  methods: {
    async submitConfirmCode() {
      this.isLoading = true;
      this.$cognito.confirmation(this.email, this.confirmCode)
        .then(async(result) => {
          console.log(result);
          await this.autoLogin();
        })
        .catch((err) => {
          this.error = err;
          this.showConfirmError();
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    autoLogin() {
      const authenticationData = JSON.parse(localStorage.getItem('authenticationData'));

      if (!authenticationData || authenticationData.username !== this.email) {
        return this.$store.dispatch('appNavigator/reset', SignIn);
      }

      return this.$cognito.login(authenticationData.username, authenticationData.password)
        .then(async(result) => {
          console.log(result);
          localStorage.removeItem('authenticationData');
          this.goToUserData();
        })
        .catch((err) => {
          this.error = err;
          this.showConfirmError();
        });
    },
    goToUserData() {
      this.$helpers.createUserDevise();
      this.$store.dispatch('appNavigator/push', UserData);
    },
    showConfirmError() {
      this.confirmErrorVisible = true;
    },
    closeConfirmError() {
      this.confirmErrorVisible = false;
    },
  },
};
</script>
