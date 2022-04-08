<template>
  <v-ons-page>
    <custom-toolbar title="データを引き継ぐ" />
    <loading :visible="isLoading" />
    <div class="content">
      <base-form>
        <text-field
          v-model="user.code"
          title="引継ぎID"
        />
        <user-password
          v-model="user.password"
          :can-show-password="false"
          :has-help="false"
          title="パスワード"
        />
        <template #buttons>
          <div>
            <custom-submit @click="signIn">
              ログイン
            </custom-submit>
          </div>
        </template>
      </base-form>
    </div>

    <error-dialog
      title="引継ぎエラー"
      :is-visible="signInErrorVisible"
      error-message="入力された引継ぎIDまたはパスワードが一致しません。再度ご確認の上入力してください。"
      @close="closeSignInError"
    />
  </v-ons-page>
</template>

<script>
import CheckCompleteRegistration from '@/mixins/checkCompleteRegistration';

// components
import BaseForm from '@/components/organisms/form/base-form';
import TextField from '@/components/organisms/form/text-field';
import UserPassword from '@/components/organisms/user/user-password';
import CustomSubmit from '@/components/organisms/form/custom-submit';
import ErrorDialog from '@/components/organisms/error-dialog';

import ApiClient from '@/api_client';

export default {
  name: 'SignIn',
  components: {
    BaseForm,
    TextField,
    UserPassword,
    CustomSubmit,
    ErrorDialog,
  },
  mixins: [CheckCompleteRegistration],
  data() {
    return {
      user: {
        code: '',
        password: '',
      },
      signInErrorVisible: false,
      isLoading: false,
    };
  },
  methods: {
    async signIn() {
      this.isLoading = true;

      try {
        await ApiClient.signIn({ ...this.user });
        this.checkBeforeGoToAppTabbar();
      } catch (error) {
        this.showSignInError();
      } finally {
        this.isLoading = false;
      }
    },
    showSignInError() {
      this.signInErrorVisible = true;
    },
    closeSignInError() {
      this.signInErrorVisible = false;
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
  margin-top: 23px;
}

.form {
  margin-bottom: 55px;
}
</style>
