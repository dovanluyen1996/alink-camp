<template>
  <v-ons-page>
    <custom-toolbar title="ユーザー情報の登録" />
    <div class="content">
      <base-form>
        <radio-field
          v-model="gender"
          :labels="genderLabels"
          title="性別"
        />
        <date-field
          v-model="birthdate"
          title="生年月日"
        />
        <select-field
          v-model="prefecture"
          :options="prefectureOptions"
          placeholder="都道府県を選択してください"
          title="お住まい"
        />
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
import RadioField from '@/components/organisms/form/radio-field';
import DateField from '@/components/organisms/form/date-field';
import SelectField from '@/components/organisms/form/select-field';
import CustomSubmit from '@/components/organisms/form/custom-submit';

// pages
import UserNewConfirm from '@/views/user/new/confirm';

export default {
  name: 'UserNewUserInformation',
  components: {
    BaseForm,
    RadioField,
    DateField,
    SelectField,
    CustomSubmit,
  },
  data() {
    return {
      gender: 0,
      birthdate: '',
      prefecture: -1,
      genderLabels: [
        {
          value: 0,
          text: '男性',
        },
        {
          value: 1,
          text: '女性',
        },
      ],
      prefectureOptions: [
        {
          value: 0,
          text: '北海道',
        },
        {
          value: 1,
          text: '東京',
        },
        {
          value: 2,
          text: '沖縄',
        },
      ],
    };
  },
  methods: {
    goToConfirm() {
      this.$store.dispatch('appNavigator/push', UserNewConfirm);
    },
  },
};
</script>
