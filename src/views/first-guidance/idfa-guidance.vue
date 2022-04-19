<template>
  <v-ons-page>
    <custom-toolbar
      modifier="green"
      title="キャンプ計画の保存"
    />
    <div class="background" />
    <div class="content">
      <first-guidance-index
        image-src="guidances/campsite-items.svg"
        message="キャンプの思い出や、持っていくオリジナルアイテムなどの登録もできるので、ぜひメニューよりデータ引継ぎ設定を行って下さい。"
        @onClick="showIdfaAlert"
      />
    </div>

    <v-ons-alert-dialog
      modifier="rowfooter"
      :visible.sync="isShownIdfaAlert"
    >
      <template #title>
        キャンプ天気にアプリとWEBの操作履歴の利用を許可しますか？
      </template>
      許可の設定により、今後も各種機能改善のご参考にさせていただきます。<br>
      次へのボタン押下後のポップアップで選択してください。
      <template #footer>
        <v-ons-button @click="closeIdfaAlert()">
          次へ
        </v-ons-button>
      </template>
    </v-ons-alert-dialog>
  </v-ons-page>
</template>

<script>
import ApiClient from '@/api_client';

// components
import FirstGuidanceIndex from '@/components/organisms/first-guidance';

// pages
import AppTabbar from '@/views/app-tabbar';

// config
import IdfaAaidPlugin from '@/config/idfa';

export default {
  name: 'FirstGuidanceIDFA',
  components: {
    FirstGuidanceIndex,
  },
  data() {
    return {
      isShownIdfaAlert: false,
    };
  },
  methods: {
    showIdfaAlert() {
      if (window.device.platform === 'iOS') {
        this.isShownIdfaAlert = true;
      } else {
        this.goToAppTabbar();
      }
    },
    closeIdfaAlert() {
      this.isShownIdfaAlert = false;
      this.goToAppTabbar();
    },
    async goToAppTabbar() {
      IdfaAaidPlugin.init();
      const ADJUST_TOKEN = (window.device.platform === 'iOS') ? process.env.ADJUST_TOKEN_IOS : process.env.ADJUST_TOKEN_ANDROID;
      const adjustEvent = new AdjustEvent(ADJUST_TOKEN.TUTORIAL_COMPLETED_EVENT_ID);
      Adjust.trackEvent(adjustEvent);

      await ApiClient.signUp();
      this.$helpers.createUserDevise();

      this.$store.dispatch('appNavigator/push', AppTabbar);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.background {
  background: $bg-first-guidance;
}

/deep/ {
  .alert-dialog-content {
    font-size: 16px;
  }
}
</style>
