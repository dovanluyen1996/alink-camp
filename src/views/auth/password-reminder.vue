<template>
  <v-ons-page>
    <custom-toolbar title="パスワードを忘れた方" />
    <div class="content">
      <base-form>
        <text-field
          v-model="email"
          title="メールアドレス"
        />
        <template #buttons>
          <custom-submit @click="sendAuthCode">
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
import TextField from '@/components/organisms/form/text-field';
import CustomSubmit from '@/components/organisms/form/custom-submit';

// pages
import PasswordReset from '@/views/auth/password-reset';

export default {
  name: 'PasswordReminder',
  components: {
    BaseForm,
    TextField,
    CustomSubmit,
  },
  data() {
    return {
      email: '',
    };
  },
  methods: {
    sendAuthCode() {
      this.$store.dispatch('appNavigator/push', PasswordReset);
    },
  },
};
</script>
