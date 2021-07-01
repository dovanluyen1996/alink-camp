<template>
  <v-ons-page>
    <custom-toolbar
      title="ユーザー情報の登録"
      :disabled-back-button="true"
    />
    <div class="content">
      <base-form>
        <confirm-field
          :value="genderText"
          title="性別"
        />
        <confirm-field
          :value="birthdateText"
          title="生年月日"
        />
        <confirm-field
          :value="prefectureText"
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
import settings from '@/config/settings';

// components
import BaseForm from '@/components/organisms/form/base-form';
import ConfirmField from '@/components/organisms/form/confirm-field';
import CustomSubmit from '@/components/organisms/form/custom-submit';

// pages
import UserStampsCampaign from '@/views/user/user-stamps/campaign';

export default {
  name: 'UserNewConfirm',
  components: {
    BaseForm,
    ConfirmField,
    CustomSubmit,
  },
  props: {
    user: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  computed: {
    genderText() {
      const gender = settings.views.genders.find(_gender => _gender.value === this.user.gender);
      return gender ? gender.text : '';
    },
    birthdateText() {
      return this.$moment(this.user.birthdate).format('YYYYMMDD');
    },
    prefectureText() {
      const prefecture = settings.views.prefectures.find(
        _prefecture => _prefecture.value === this.user.prefecture,
      );
      return prefecture ? prefecture.text : '';
    },
  },
  methods: {
    clickBack() {
      this.$store.dispatch('appNavigator/pop');
    },
    async submitUserData() {
      const success = await this.$store.dispatch('models/currentUser/updateUser', this.user);

      if (success) this.$store.dispatch('appNavigator/push', UserStampsCampaign);
    },
  },
};
</script>

<style lang="scss" scoped>
.button-back {
  width: 120px;
}
</style>
