<template>
  <v-ons-page>
    <custom-toolbar
      title="ユーザー情報の登録"
      :disabled-back-button="true"
    />
    <div class="content">
      <validation-observer v-slot="{ handleSubmit }">
        <base-form>
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
            <custom-submit @click="handleSubmit(goToConfirm)">
              設定確認
            </custom-submit>
          </template>
        </base-form>
      </validation-observer>
    </div>
  </v-ons-page>
</template>

<script>
// components
import BaseForm from '@/components/organisms/form/base-form';
import UserBirthdate from '@/components/organisms/user/user-birthdate';
import UserPrefecture from '@/components/organisms/user/user-prefecture';
import CustomSubmit from '@/components/organisms/form/custom-submit';

// pages
import UserNewConfirm from '@/views/user/new/confirm';

export default {
  name: 'UserNewUserData',
  components: {
    BaseForm,
    UserBirthdate,
    UserPrefecture,
    CustomSubmit,
  },
  data() {
    return {
      user: {
        birthdate: '1980-01-01',
        prefecture: -1,
      },
    };
  },
  mounted() {
    window.addEventListener('keyboardDidShow', this.onKeyBoardShow);
  },
  beforeDestroy() {
    window.removeEventListener('keyboardDidShow', this.onKeyBoardShow);
  },
  methods: {
    goToConfirm() {
      this.$store.dispatch('appNavigator/push', {
        extends: UserNewConfirm,
        onsNavigatorProps: {
          user: this.user,
        },
      });
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
