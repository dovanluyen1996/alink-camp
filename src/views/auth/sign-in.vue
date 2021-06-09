<template>
  <v-ons-page class="sign-in">
    <custom-toolbar>
      データを引き継ぐ
    </custom-toolbar>
    <text-field
      v-model="email"
      title="メールアドレス"
    />
    <password-field
      v-model="password"
      title="パスワード"
    />
    <custom-submit @click="signIn">
      ログイン
    </custom-submit>
    <v-ons-button
      modifier="quiet"
      @click="goToPasswordReminder"
    >
      パスワードを忘れた方はこちら
    </v-ons-button>

    <social-login/>
  </v-ons-page>
</template>

<script>
import TextField from '@/components/organisms/form/text-field';
import PasswordField from '@/components/organisms/form/password-field';
import CustomSubmit from '@/components/atoms/form/custom-submit';
import SocialLogin from '@/components/organisms/social-login';

export default {
  name: 'SignIn',
  components: {
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
      console.log('signIn');
    },
    goToPasswordReminder() {
      console.log('goToPasswordReminder');
    },
  },
};
</script>

<style lang="scss">
.sign-in {
  text-align: center;
}
.social-login {
  margin-top: 40px;
}
</style>
