<template>
  <v-ons-page>
    <custom-toolbar
      title="ユーザー情報の登録"
      :disabled-back-button="true"
    />
    <div class="content">
      <base-form>
        <user-gender v-model="user.gender" />
        <user-birthdate v-model="user.birthdate" />
        <user-prefecture v-model="user.prefecture" />
        <template #buttons>
          <custom-submit @click="goToConfirm">
            設定確認
          </custom-submit>
        </template>
      </base-form>
    </div>
  </v-ons-page>
</template>

<script>
// components
import BaseForm from '@/components/organisms/form/base-form';
import UserGender from '@/components/organisms/user/user-gender';
import UserBirthdate from '@/components/organisms/user/user-birthdate';
import UserPrefecture from '@/components/organisms/user/user-prefecture';
import CustomSubmit from '@/components/organisms/form/custom-submit';

// pages
import UserNewConfirm from '@/views/user/new/confirm';

export default {
  name: 'UserNewUserData',
  components: {
    BaseForm,
    UserGender,
    UserBirthdate,
    UserPrefecture,
    CustomSubmit,
  },
  data() {
    return {
      user: {
        gender: 0,
        birthdate: '',
        prefecture: -1,
      },
    };
  },
  methods: {
    goToConfirm() {
      this.$store.dispatch('appNavigator/push', UserNewConfirm);
    },
  },
};
</script>
