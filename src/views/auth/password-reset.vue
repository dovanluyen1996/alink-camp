<template>
  <v-ons-page>
    <custom-toolbar title="パスワードを忘れた方" />
    <div class="content">
      <base-form>
        <text-field
          v-model="code"
          title="認証コード"
        />
        <password-field
          v-model="email"
          title="新しいパスワードを設定"
          class="new-password"
        />
        <template v-slot:buttons>
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
import TextField from '@/components/organisms/form/text-field';
import PasswordField from '@/components/organisms/form/password-field';
import CustomSubmit from '@/components/organisms/form/custom-submit';

export default {
  name: 'PasswordReset',
  components: {
    BaseForm,
    TextField,
    PasswordField,
    CustomSubmit,
  },
  data() {
    return {
      code: '',
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
