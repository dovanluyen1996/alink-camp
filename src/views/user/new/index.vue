<template>
  <v-ons-page>
    <custom-toolbar title="ユーザー情報の登録" />
    <div class="content">
      <base-form>
        <text-field
          v-model="email"
          title="メールアドレス"
        />
        <password-field
          v-model="password"
          :can-show-password="true"
          title="パスワード"
          help="※6文字以上の半角英数字で登録して下さい"
        />
        <template #buttons>
          <custom-submit @click="getComfirmCode">
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
import TextField from '@/components/organisms/form/text-field';
import PasswordField from '@/components/organisms/form/password-field';
import CustomSubmit from '@/components/organisms/form/custom-submit';
import SocialLogin from '@/components/organisms/social-login';

export default {
  name: 'UserNew',
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
    getComfirmCode() {
      console.log('signIn');
      this.goToComfirmCode();
    },
    goToComfirmCode() {
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  margin-bottom: 60px;
}
</style>
