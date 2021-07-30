<template>
  <v-ons-page>
    <custom-toolbar title="データ引継ぎ設定" />
    <div class="content">
      <loading :visible="isLoading" />
      <validation-observer v-slot="{ handleSubmit }">
        <base-form>
          <!-- TODO: change email -->
          <has-editable-button-field
            title="メールアドレス"
            :value="user.email"
            @clickEdit="goToEditEmail"
          />
          <has-editable-button-field
            title="パスワード"
            value="**************"
            @clickEdit="goToEditPassword"
          />
          <validation-provider
            v-slot="{ errors }"
            rules="required-select"
            name="性別"
          >
            <user-gender
              v-model="user.gender"
              :errors="errors"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            rules="required"
            name="生年月日"
          >
            <user-birthdate
              v-model="user.birthdate"
              :errors="errors"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            rules="required-select"
            name="お住まい"
          >
            <user-prefecture
              v-model="user.prefecture"
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
<<<<<<< HEAD
      よろしいですか？<br>
      （※機種変更時などに必要となると大切な情報です。お間違いないようご注意ください）
=======
      よろしいですか？

>>>>>>> 7fe6630 (Add confirm popup)
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
        設定を更新しました
      </template>

      設定を更新しました

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
import UserGender from '@/components/organisms/user/user-gender';
import UserBirthdate from '@/components/organisms/user/user-birthdate';
import UserPrefecture from '@/components/organisms/user/user-prefecture';
import CustomSubmit from '@/components/organisms/form/custom-submit';
import ChangePasswordView from '@/views/user/edit/change-password';

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
      completedVisible: false,
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.models.currentUser.user;
    },
    user() {
      return { ...this.currentUser };
    },
    isLoading() {
      return this.$store.getters['models/currentUser/isLoading'];
    },
  },
  async created() {
    await this.getCurrentUser();
  },
  methods: {
    goToEditEmail() {
      console.log('goToEditEmail');
    },
    goToEditPassword() {
      this.$store.dispatch('menuNavigator/push', ChangePasswordView);
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
    async update() {
      this.closeConfirmDialog();
      await this.$store.dispatch('models/currentUser/updateUser', this.user);
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
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding-bottom: 20px;
}
</style>
