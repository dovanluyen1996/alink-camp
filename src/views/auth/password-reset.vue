<template>
  <v-ons-page>
    <custom-toolbar title="パスワードを忘れた方" />
    <div class="content">
      <base-form>
        <auth-comfirm-code v-model="confirm_code" />
        <user-password-new
          v-model="email"
          title="新しいパスワードを設定"
          class="new-password"
        />
        <template #buttons>
          <custom-submit @click="submitPassword">
            設定する
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
import UserPasswordNew from '@/components/organisms/user/user-password-new';
import CustomSubmit from '@/components/organisms/form/custom-submit';

export default {
  name: 'PasswordReset',
  components: {
    BaseForm,
    AuthComfirmCode,
    UserPasswordNew,
    CustomSubmit,
  },
  data() {
    return {
      confirm_code: '',
      email: '',
    };
  },
  methods: {
    submitPassword() {
      console.log('submitPassword');
    },
  },
};
</script>

<style lang="scss" scoped>
.new-password {
  margin-top: 45px;
  margin-bottom: 40px;
}
</style>
