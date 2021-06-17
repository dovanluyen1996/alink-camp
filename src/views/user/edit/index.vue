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
        <radio-field
          v-model="user.gender"
          :labels="genderLabels"
          title="性別"
        />
        <date-field
          v-model="user.birthdate"
          title="生年月日"
        />
        <select-field
          v-model="user.prefecture"
          :options="prefectureOptions"
          placeholder="都道府県を選択してください"
          title="お住まい"
        />
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
      （※機種変更時などに必要となると大切な情報です。お間違えないようご注意ください）
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
import RadioField from '@/components/organisms/form/radio-field';
import DateField from '@/components/organisms/form/date-field';
import SelectField from '@/components/organisms/form/select-field';
import CustomSubmit from '@/components/organisms/form/custom-submit';

export default {
  name: 'UserNewUserData',
  components: {
    BaseForm,
    HasEditableButtonField,
    RadioField,
    DateField,
    SelectField,
    CustomSubmit,
  },
  data() {
    return {
      isShownComfirmDialog: false,
      user: {
        email: 'test@example.com',
        password: '*******',
        gender: 0,
        birthdate: '1980/01/01',
        prefecture: 1,
      },
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
      this.isShownComfirmDialog = false;
    },
    update() {
      this.isShownComfirmDialog = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  padding-bottom: 20px;
}
</style>
