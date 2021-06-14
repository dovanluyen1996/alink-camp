<template>
  <v-ons-page modifier="background-photo">
    <custom-toolbar title="データを引き継ぐ" />
    <div class="content">
      <base-form>
        <text-field
          v-model="email"
          title="メールアドレス"
        />
        <password-field
          v-model="password"
          title="パスワード"
        />
        <template #buttons>
          <custom-submit @click="signIn">
            ログイン
          </custom-submit>
          <v-ons-button
            modifier="quiet"
            class="go-to-password-reminder"
            @click="goToPasswordReminder"
          >
            パスワードを忘れた方はこちら
          </v-ons-button>
        </template>
      </base-form>

      <social-login />
    </div>
  </v-ons-page>
</template>

<script>
// components
import BaseForm from '@/components/organisms/form/base-form';
import TextField from '@/components/organisms/form/text-field';
import PasswordField from '@/components/organisms/form/password-field';
import CustomSubmit from '@/components/organisms/form/custom-submit';
import SocialLogin from '@/components/organisms/social-login';

// pages
import PasswordReminder from '@/views/auth/password-reminder';
import UserStampsCampaign from '@/views/user/user-stamps/campaign';

export default {
  name: 'SignIn',
  components: {
    BaseForm,
    TextField,
    PasswordField,
    CustomSubmit,
    SocialLogin,
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    signIn() {
      this.$store.dispatch('appNavigator/push', UserStampsCampaign);
    },
    goToPasswordReminder() {
      this.$store.dispatch('appNavigator/push', PasswordReminder);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.password-field {
  /deep/ .card {
    margin-bottom: 15px;
  }
}

.go-to-password-reminder {
  margin-top: 10px;
}

.form {
  margin-bottom: 40px;
}
</style>
