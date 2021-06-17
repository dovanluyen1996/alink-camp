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
  </v-ons-page>
</template>

<script>
// components
import BaseForm from '@/components/organisms/form/base-form';
import UserEmail from '@/components/organisms/user/user-email';
import CustomSubmit from '@/components/organisms/form/custom-submit';

// pages
import PasswordReset from '@/views/auth/password-reset';

export default {
  name: 'PasswordReminder',
  components: {
    BaseForm,
    UserEmail,
    CustomSubmit,
  },
  data() {
    return {
      user: {
        email: '',
      },
    };
  },
  methods: {
    sendComfirmCode() {
      this.$store.dispatch('appNavigator/push', PasswordReset);
    },
  },
};
</script>
