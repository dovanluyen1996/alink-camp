<template>
  <v-ons-page>
    <custom-toolbar
      title="ユーザー情報の登録"
      :disabled-back-button="true"
    />
    <div class="content">
      <base-form>
        <confirm-field
          :value="gender"
          title="性別"
        />
        <confirm-field
          :value="birthdate"
          title="生年月日"
        />
        <confirm-field
          :value="prefecture"
          title="お住まい"
        />
        <template #buttons>
          <v-ons-button
            modifier="quiet"
            class="button-back"
            @click="clickBack"
          >
            修正する
          </v-ons-button>
          <custom-submit
            width="180px"
            @click="submitUserData"
          >
            設定完了
          </custom-submit>
        </template>
      </base-form>
    </div>
  </v-ons-page>
</template>

<script>
// components
import BaseForm from '@/components/organisms/form/base-form';
import ConfirmField from '@/components/organisms/form/confirm-field';
import CustomSubmit from '@/components/organisms/form/custom-submit';

export default {
  name: 'UserNewConfirm',
  components: {
    BaseForm,
    ConfirmField,
    CustomSubmit,
  },
  data() {
    return {
      gender: '男性',
      birthdate: '1982/12/31',
      prefecture: '東京',
    };
  },
  methods: {
    clickBack() {
      this.$store.dispatch('appNavigator/pop');
    },
    submitUserData() {
      console.log('submitUserData');
    },
  },
};
</script>

<style lang="scss" scoped>
.button-back {
  width: 120px;
}
</style>
