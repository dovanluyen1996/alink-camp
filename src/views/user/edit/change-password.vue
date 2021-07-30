<template>
  <v-ons-page>
    <custom-toolbar title="データ引継ぎ設定" />
    <div class="content">
      <validation-observer v-slot="{ handleSubmit }">
        <base-form>
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="今のパスワード"
          >
            <password-field
              v-model="oldPassword"
              title="今のパスワード"
              :errors="errors"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            rules="required|password"
            name="新しいパスワード"
          >
            <user-password-new
              v-model="newPassword"
              :errors="errors"
            />
          </validation-provider>
          <template #buttons>
            <custom-submit @click="handleSubmit(showConfirmDialog)">
              変更
            </custom-submit>
          </template>
        </base-form>
      </validation-observer>
    </div>

    <error-dialog
      title="パスワードの更新に失敗しました"
      :is-visible="changePasswordErrorVisible"
      :error-message="errorMessage"
      @close="closeChangePasswordError"
    />

    <v-ons-alert-dialog :visible="comfirmDialogVisible">
      <template #title>
        設定変更確認
      </template>

      データ引継ぎ設定の内容を変更します。<br>
      よろしいですか？<br>
      （※機種変更時などに必要となると大切な情報です。お間違えないようご注意ください）

      <template #footer>
        <v-ons-button
          modifier="quiet quiet-dark"
          @click="closeConfirmDialog"
        >
          キャンセル
        </v-ons-button>
        <v-ons-button
          @click="submitPassword"
        >
          変更する
        </v-ons-button>
      </template>
    </v-ons-alert-dialog>

    <v-ons-alert-dialog
      :visible.sync="completedVisible"
    >
      <template #title>
        パスワードを更新しました
      </template>

      パスワードを更新しました

      <template #footer>
        <v-ons-button
          @click="closeCompletedDialog()"
        >
          OK
        </v-ons-button>
      </template>
    </v-ons-alert-dialog>
  </v-ons-page>
</template>

<script>
// components
import BaseForm from '@/components/organisms/form/base-form';
import UserPasswordNew from '@/components/organisms/user/user-password-new';
import CustomSubmit from '@/components/organisms/form/custom-submit';
import ErrorDialog from '@/components/organisms/error-dialog';
import PasswordField from '@/components/organisms/form/password-field';

export default {
  name: 'ChangePasswordView',
  components: {
    BaseForm,
    UserPasswordNew,
    CustomSubmit,
    ErrorDialog,
    PasswordField,
  },
  data() {
    return {
      oldPassword: '',
      newPassword: '',
      error: '',
      changePasswordErrorVisible: false,
      completedVisible: false,
      comfirmDialogVisible: false,
    };
  },
  computed: {
    errorMessage() {
      if (!this.error) return '';

      switch (this.error.code) {
      case 'NotAuthorizedException':
        return '今のパスワードと一致しません';
      case 'LimitExceededException':
        return '試行回数の制限を超えました。しばらくしてから試してください';
      default:
        return 'パスワードの変更に失敗しました';
      }
    },
  },
  methods: {
    submitPassword() {
      this.closeConfirmDialog();
      this.$cognito.changePassword(this.oldPassword, this.newPassword)
        .then(() => {
          this.showCompletedDialog();
        })
        .catch((err) => {
          this.error = err;
          this.showChangePasswordError();
        });
    },
    showChangePasswordError() {
      this.changePasswordErrorVisible = true;
    },
    closeChangePasswordError() {
      this.changePasswordErrorVisible = false;
    },
    showConfirmDialog() {
      this.comfirmDialogVisible = true;
    },
    closeConfirmDialog() {
      this.comfirmDialogVisible = false;
    },
    showCompletedDialog() {
      this.completedVisible = true;
    },
    closeCompletedDialog() {
      this.completedVisible = false;
      this.$store.dispatch('menuNavigator/pop');
    },
  },
};
</script>
