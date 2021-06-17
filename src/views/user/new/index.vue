<template>
  <v-ons-page>
    <custom-toolbar title="ユーザー情報の登録" />
    <div class="content">
      <base-form>
        <user-email v-model="user.email" />
        <user-password
          v-model="user.password"
          :can-show-password="true"
        />
        <template #buttons>
          <custom-submit @click="getConfirmCode">
            認証コードを送信
          </custom-submit>
        </template>
      </base-form>

      <social-login title="他サービスで設定" />
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

// pages
import UerNewConfirmCode from '@/views/user/new/confirm-code';

export default {
  name: 'UserNew',
  components: {
    BaseForm,
    UserEmail,
    UserPassword,
    CustomSubmit,
    SocialLogin,
  },
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    getConfirmCode() {
      this.goToConfirmCode();
    },
    goToConfirmCode() {
      this.$store.dispatch('appNavigator/push', UerNewConfirmCode);
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  margin-bottom: 60px;
}
</style>
