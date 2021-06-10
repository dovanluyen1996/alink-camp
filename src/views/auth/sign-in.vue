<template>
  <v-ons-page class="sign-in">
    <custom-toolbar title="データを引き継ぐ" />
    <text-field
      v-model="email"
      title="メールアドレス"
    />
    <password-field
      v-model="password"
      title="パスワード"
      :help="null"
    />
    <div class="remember-password">
      <check-field v-model="rememberPassword">
        パスワードを保存
      </check-field>
      <div>
        ※6文字以上の半角英数字で登録して下さい
      </div>
    </div>
    <custom-submit @click="signIn">
      ログイン
    </custom-submit>
    <v-ons-button
      modifier="quiet"
      @click="goToPasswordReminder"
    >
      パスワードを忘れた方はこちら
    </v-ons-button>

    <social-login />
  </v-ons-page>
</template>

<script>
import TextField from '@/components/organisms/form/text-field';
import PasswordField from '@/components/organisms/form/password-field';
import CheckField from '@/components/organisms/form/check-field';
import CustomSubmit from '@/components/atoms/form/custom-submit';
import SocialLogin from '@/components/organisms/social-login';

export default {
  name: 'SignIn',
  components: {
    TextField,
    PasswordField,
    CheckField,
    CustomSubmit,
    SocialLogin,
  },
  data() {
    return {
      email: '',
      password: '',
      rememberPassword: true,
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

<style lang="scss" scoped>
.sign-in {
  text-align: center;
}

.password-field {
  /deep/ .card {
    margin-bottom: 15px;
  }
}

.remember-password {
  margin: 0 40px 60px;
  text-align: left;

  /deep/ .custom-input__visual {
    border-color: #222;
  }
}

.social-login {
  margin-top: 40px;
}
</style>
