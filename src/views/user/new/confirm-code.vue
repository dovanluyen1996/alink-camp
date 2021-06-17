<template>
  <v-ons-page>
    <custom-toolbar
      title="ユーザー情報の登録"
      :disabled-back-button="true"
    />
    <div class="content">
      <base-form>
        <auth-comfirm-code v-model="confirm_code" />
        <template #buttons>
          <custom-submit @click="submitConfirmCode">
            認証完了
          </custom-submit>
        </template>
      </base-form>
    </div>
  </v-ons-page>
</template>

<script>
// components
import BaseForm from '@/components/organisms/form/base-form';
import AuthComfirmCode from '@/components/organisms/auth/comfirm-code';
import CustomSubmit from '@/components/organisms/form/custom-submit';

// pages
import UserData from '@/views/user/new/user-data';

export default {
  name: 'UserNewConfirmCode',
  components: {
    BaseForm,
    AuthComfirmCode,
    CustomSubmit,
  },
  data() {
    return {
      confirm_code: '',
    };
  },
  methods: {
    submitConfirmCode() {
      console.log('submitConfirmCode');
      this.goToUserData();
    },
    goToUserData() {
      this.$store.dispatch('appNavigator/push', UserData);
    },
  },
};
</script>
