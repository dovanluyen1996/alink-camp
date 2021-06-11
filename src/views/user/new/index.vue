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
import TextField from '@/components/organisms/form/text-field';
import PasswordField from '@/components/organisms/form/password-field';
import CustomSubmit from '@/components/organisms/form/custom-submit';
import SocialLogin from '@/components/organisms/social-login';

// pages
import ConfirmCode from '@/views/user/new/confirm-code';

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
    getConfirmCode() {
      this.goToConfirmCode();
    },
    goToConfirmCode() {
      // NOTE: 認証コードを受け取った後は戻れないようにresetしているが
      //       popのアニメーションになってしまい不自然なので一時的にfadeにしている
      //       dispatchにonsNavigatorOptionsで設定しても効かないのでstoreの変更にしている
      this.$store.commit('appNavigator/setOptions', {
        animation: 'fade',
      });
      this.$store.dispatch('appNavigator/reset', ConfirmCode);
      this.$nextTick(() => {
        this.$store.commit('appNavigator/setOptions', {});
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.form {
  margin-bottom: 60px;
}
</style>
