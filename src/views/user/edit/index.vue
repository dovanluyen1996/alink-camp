<template>
  <v-ons-page>
    <custom-toolbar title="データ引継ぎ設定" />
    <div class="content">
      <loading :visible="isLoading" />
      <validation-observer v-slot="{ handleSubmit }">
        <base-form>
          <has-editable-button-field
            :title="isSocialSignIn() ? 'ソーシャルログイン利用中' : 'メールアドレス'"
            :value="user.email"
            :editable="false"
          />
          <has-editable-button-field
            v-if="!isSocialSignIn()"
            title="パスワード"
            value="**************"
            @clickEdit="goToEditPassword"
          />
          <validation-provider
            v-slot="{ errors }"
            rules="required-past-day"
            name="生年月日"
          >
            <user-birthdate
              v-model="user.birthdate"
              :errors="errors"
            />
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
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
import UserBirthdate from '@/components/organisms/user/user-birthdate';
import UserPrefecture from '@/components/organisms/user/user-prefecture';
import CustomSubmit from '@/components/organisms/form/custom-submit';
import ChangePasswordView from '@/views/user/edit/change-password';

export default {
  name: 'UserNewUserData',
  components: {
    BaseForm,
    HasEditableButtonField,
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
      const user = { ...this.currentUser };
      if (!user.birthdate) user.birthdate = '';

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
    onKeyBoardShow() {
      // Scroll to selected input
      const activeField = document.activeElement;
      if (activeField) {
        activeField.scrollIntoView(true);
      }
    },
    isSocialSignIn() {
      return JSON.parse(localStorage.getItem('externalProviderSignIn'));
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
