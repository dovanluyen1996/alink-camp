<template>
  <v-ons-page>
    <custom-toolbar
      title="データ引継ぎ設定"
      :disabled-back-button="true"
    />
    <div class="content">
      <validation-observer v-slot="{ handleSubmit }">
        <base-form>
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
      よろしいですか？

      <template #footer>
        <v-ons-button
          modifier="quiet quiet-dark"
          @click="closeConfirmDialog"
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

    <completed-dialog
      action="updateUserData"
      :is-visible="completedVisible"
      @close="closeCompletedDialog"
    />
  </v-ons-page>
</template>

<script>
// pages
import AppTabbar from '@/views/app-tabbar';

// components
import BaseForm from '@/components/organisms/form/base-form';
import UserGender from '@/components/organisms/user/user-gender';
import UserBirthdate from '@/components/organisms/user/user-birthdate';
import UserPrefecture from '@/components/organisms/user/user-prefecture';
import CustomSubmit from '@/components/organisms/form/custom-submit';
import CompletedDialog from '@/components/organisms/dialog/completed-dialog';

export default {
  name: 'EditUserData',
  components: {
    BaseForm,
    UserGender,
    UserBirthdate,
    UserPrefecture,
    CustomSubmit,
    CompletedDialog,
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
  },
  methods: {
    showConfirmDialog() {
      this.isShownComfirmDialog = true;
    },
    closeConfirmDialog() {
      this.isShownComfirmDialog = false;
    },
    async update() {
      this.closeConfirmDialog();
      await this.$store.dispatch('models/currentUser/updateUser', this.user);
      this.showCompletedDialog();
    },
    showCompletedDialog() {
      this.completedVisible = true;
    },
    closeCompletedDialog() {
      this.completedVisible = false;
      this.$store.dispatch('appNavigator/reset', AppTabbar);
    },
  },
};
</script>
