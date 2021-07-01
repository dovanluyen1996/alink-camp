<template>
  <v-ons-page>
    <custom-toolbar
      title="ユーザー情報の登録"
      :disabled-back-button="true"
    />
    <div class="content">
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
      title="失敗を確認する"
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
    };
  },
  computed: {
    errorMessage() {
      if (!this.error) return '';

      return '認証コードが一致しません';
    },
  },
  methods: {
    submitConfirmCode() {
      this.$cognito.confirmation(this.email, this.confirmCode)
        .then(async(result) => {
          console.log(result);
          this.autoLogin();
        })
        .catch((err) => {
          this.error = err;
          this.showConfirmError();
        });
    },
    autoLogin() {
      this.$cognito.autoLogin(this.email)
        .then(async(result) => {
          console.log(result);
          this.goToUserData();
        })
        .catch((err) => {
          this.error = err;
          this.showConfirmError();
        });
    },
    goToUserData() {
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
