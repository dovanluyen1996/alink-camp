<template>
  <v-ons-page>
    <custom-toolbar title="データ引継ぎ設定" />
    <div class="content">
      <loading :visible="isLoading" />
      <validation-observer v-slot="{ handleSubmit }">
        <base-form>
          <validation-provider
            v-slot="{ errors }"
            rules="required|email"
            name="新しいメールアドレス"
          >
            <user-email-new
              v-model="newEmail"
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
          @click="submitChangeEmail"
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

      メールアドレスを変更しました。

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
import UserEmailNew from '@/components/organisms/user/user-email-new';
import CustomSubmit from '@/components/organisms/form/custom-submit';

export default {
  name: 'ChangePasswordView',
  components: {
    BaseForm,
    CustomSubmit,
    UserEmailNew,
  },
  data() {
    return {
      newEmail: '',
      completedVisible: false,
      comfirmDialogVisible: false,
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters['models/currentUser/isLoading'];
    },
  },
  methods: {
    async submitChangeEmail() {
      this.closeConfirmDialog();
      await this.$store.dispatch('models/currentUser/changeEmail', { email: this.newEmail });
      this.showCompletedDialog();
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
