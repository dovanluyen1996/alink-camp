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
            rules="required|password"
            name="パスワード"
          >
            <password-field
              v-model="passwrod"
              :can-show-password="true"
              help="※4文字の半角数字で登録して下さい"
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
    </div>

    <v-ons-alert-dialog :visible="isShownComfirmDialog">
      <template #title>
        設定変更確認
      </template>

      データ引継ぎ設定の内容を変更します。<br>
      よろしいですか？

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
        変更完了
      </template>

      情報を変更しました。

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
      isShownComfirmDialog: false,
      completedVisible: false,
      passwrod: ''
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
      let updatedUser = { password: this.passwrod }
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

/deep/ .form-buttons {
  padding-bottom: 10px;
}
</style>
