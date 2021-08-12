<template>
  <v-ons-page>
    <custom-toolbar title="データ引き継ぎ設定" />
    <div class="content">
      <base-form>
        <has-editable-button-field
          :value="user.email"
          @clickEdit="goToEditEmail"
        />
        <has-editable-button-field
          value="**************"
          @clickEdit="goToEditPassword"
        />
        <user-gender v-model="user.gender" />
        <user-birthdate v-model="user.birthdate" />
        <user-prefecture v-model="user.prefecture" />
        <template #buttons>
          <custom-submit @click="showConfirmDialog">
            保存
          </custom-submit>
        </template>
      </base-form>
    </div>

    <v-ons-alert-dialog :visible="isShownComfirmDialog">
      <template #title>
        設定変更確認
      </template>
      データ引継ぎ設定の内容を変更します。<br>
      よろしいですか？<br>
      （※機種変更時などに必要となると大切な情報です。お間違いないようご注意ください）
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
  </v-ons-page>
</template>

<script>
// components
import BaseForm from '@/components/organisms/form/base-form';
import HasEditableButtonField from '@/components/organisms/form/has-editable-button-field';
import UserGender from '@/components/organisms/user/user-gender';
import UserBirthdate from '@/components/organisms/user/user-birthdate';
import UserPrefecture from '@/components/organisms/user/user-prefecture';
import CustomSubmit from '@/components/organisms/form/custom-submit';

export default {
  name: 'UserNewUserData',
  components: {
    BaseForm,
    HasEditableButtonField,
    UserGender,
    UserBirthdate,
    UserPrefecture,
    CustomSubmit,
  },
  data() {
    return {
      isShownComfirmDialog: false,
      user: {
        email: 'test@example.com',
        password: '*******',
        gender: 0,
        birthdate: '1980-01-01',
        prefecture: 1,
      },
    };
  },
  methods: {
    goToEditEmail() {
      console.log('goToEditEmail');
    },
    goToEditPassword() {
      console.log('goToEditPassword');
    },
    showConfirmDialog() {
      this.isShownComfirmDialog = true;
    },
    closeConfirmDialog() {
      this.isShownComfirmDialog = false;
    },
    cancel() {
      this.closeConfirmDialog();
    },
    update() {
      this.closeConfirmDialog();
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding-bottom: 20px;
}
</style>
