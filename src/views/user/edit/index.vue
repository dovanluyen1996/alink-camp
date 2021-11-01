<template>
  <v-ons-page>
    <custom-toolbar title="データ引継ぎ設定" />
    <div class="content">
      <loading :visible="isLoading" />
      <validation-observer v-slot="{ handleSubmit }">
        <base-form>
          <has-editable-button-field
            title="引継ぎID"
            :value="user.code"
            :editable="false"
          />
          <validation-provider
            v-slot="{ errors }"
            rules="password"
            name="パスワード"
          >
            <password-field
              v-model="password"
              :can-show-password="true"
              help="※6文字以上の半角英数字で登録して下さい"
              title="パスワード"
              :errors="errors"
            />
          </validation-provider>
          <template #buttons>
            <custom-submit @click="handleSubmit(showConfirmDialog)">
              保存
            </custom-submit>
          </template>
        </base-form>
      </validation-observer>

      <p class="notice">
        ※パスワードを設定していない場合は、データ引き継ぎはご利用いただけません
      </p>

      <p class="notice">
        ※データを引継ぐのに大切なIDです、メモを残すなど必ず保存をしてください
      </p>

      <p class="notice">
        ※再インストールや機種変更時にアプリTOPのデータを引継ぐよりご利用ください
      </p>
    </div>

    <v-ons-alert-dialog :visible="isShownComfirmDialog">
      <template #title>
        {{ confirmDialogTitle }}
      </template>

      {{ confirmDialogBody }}

      <template #footer>
        <v-ons-button
          modifier="quiet quiet-dark"
          @click="cancel"
        >
          キャンセル
        </v-ons-button>
        <v-ons-button
          @click="update"
        >
          変更する
        </v-ons-button>
      </template>
    </v-ons-alert-dialog>

    <v-ons-alert-dialog
      :visible.sync="completedVisible"
    >
      <template #title>
        引継ぎ設定を完了しました
      </template>

      機種変更または、アプリの再インストール後にデータを引継ぐために必要な情報です。<br>
      必ずメモなどをして保管をしてください。

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
import HasEditableButtonField from '@/components/organisms/form/has-editable-button-field';
import CustomSubmit from '@/components/organisms/form/custom-submit';
import PasswordField from '@/components/organisms/form/password-field';

export default {
  name: 'UserNewUserData',
  components: {
    BaseForm,
    HasEditableButtonField,
    CustomSubmit,
    PasswordField,
  },
  data() {
    return {
      confirmDialogTitle: '',
      confirmDialogBody: '',
      isShownComfirmDialog: false,
      completedVisible: false,
      password: ''
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.models.currentUser.user;
    },
    user() {
      const user = { ...this.currentUser };
      return user;
    },
    isLoading() {
      return this.$store.getters['models/currentUser/isLoading'];
    },
  },
  async created() {
    await this.getCurrentUser();
  },
  mounted() {
    window.addEventListener('keyboardDidShow', this.onKeyBoardShow);
  },
  beforeDestroy() {
    window.removeEventListener('keyboardDidShow', this.onKeyBoardShow);
  },
  methods: {
    showConfirmDialog() {
      if (this.password.length === 0) {
        this.confirmDialogTitle = 'パスワード未設定の注意'
        this.confirmDialogBody = 'パスワードが未設定のため、データの引継ぎはできません。よろしいですか？'
      } else {
        this.confirmDialogTitle = '設定変更確認'
        this.confirmDialogBody = 'データ引継ぎ設定の内容を変更します。よろしいですか？'
      }

      this.isShownComfirmDialog = true;
    },
    closeConfirmDialog() {
      this.isShownComfirmDialog = false;
    },
    cancel() {
      this.closeConfirmDialog();
    },
    async update() {
      this.closeConfirmDialog();
      let updatedUser = { password: this.password }
      await this.$store.dispatch('models/currentUser/updateUser', updatedUser);
      this.showCompletedDialog();
    },
    async getCurrentUser() {
      await this.$store.dispatch('models/currentUser/getUser');
    },
    showCompletedDialog() {
      this.completedVisible = true;
    },
    closeCompletedDialog() {
      this.completedVisible = false;
    },
    onKeyBoardShow() {
      // Scroll to selected input
      const activeField = document.activeElement;
      if (activeField) {
        activeField.scrollIntoView(true);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding-bottom: 20px;
}

.notice {
  margin: 20px;
}

/deep/ .form-buttons {
  padding-bottom: 10px;
}
</style>
