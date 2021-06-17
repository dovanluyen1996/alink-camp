<template>
  <v-ons-page>
    <custom-toolbar title="データを引き継ぐ" />
    <div class="content">
      <base-form>
        <user-email v-model="user.email" />
        <user-password
          v-model="user.password"
          :can-show-password="false"
          :has-help="false"
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
import UserEmail from '@/components/organisms/user/user-email';
import UserPassword from '@/components/organisms/user/user-password';
import CustomSubmit from '@/components/organisms/form/custom-submit';
import SocialLogin from '@/components/organisms/social-login';

// pages
import PasswordReminder from '@/views/auth/password-reminder';
import UserStampsCampaign from '@/views/user/user-stamps/campaign';

export default {
  name: 'SignIn',
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
