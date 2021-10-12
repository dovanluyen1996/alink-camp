<template>
  <v-ons-page>
    <custom-toolbar
      title="ユーザー情報の登録"
    />
    <div class="content">
      <loading :visible="isLoading" />
      <base-form>
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
import AppTabbar from '@/views/app-tabbar';

// config
import IdfaAaidPlugin from '@/config/idfa';

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
    birthdateText() {
      return this.user.birthdate && this.$moment(this.user.birthdate).format('YYYY/MM/DD');
    },
    prefectureText() {
      const prefecture = settings.views.prefectures.find(
        _prefecture => _prefecture.value === this.user.prefecture,
      );
      return prefecture ? prefecture.text : '';
    },
    isLoading() {
      return this.$store.getters['models/currentUser/isLoading'];
    },
  },
  methods: {
    clickBack() {
      this.$store.dispatch('appNavigator/pop');
    },
    submitUserData() {
      this.$store.dispatch('models/currentUser/updateUser', this.user).then(() => {
        IdfaAaidPlugin.init();
        const ADJUST_TOKEN = (window.device.platform === 'iOS') ? process.env.ADJUST_TOKEN_IOS : process.env.ADJUST_TOKEN_ANDROID;
        const adjustEvent = new AdjustEvent(ADJUST_TOKEN.REGISTRATION_COMPLETED_EVENT_ID);
        Adjust.trackEvent(adjustEvent);
        this.$store.dispatch('appNavigator/push', AppTabbar);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.button-back {
  width: 120px;
}
</style>
