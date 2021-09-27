<template>
  <v-ons-page>
    <custom-toolbar
      modifier="green"
      title="スコアデータ保存"
    />

    <div class="content">
      <content-with-footer class="cguidance-content">
        <img
          src="@/assets/images/guidances/score-data.png"
          width="165px"
        >
        <p>
          簡単なスコア登録もできるのでご活用ください。またその日の天気や気温、写真のアップロードもできるので、思い出の保存に便利です。
          データ保存のためにユーザー情報の登録をしてください。
        </p>

        <template #footer>
          <v-ons-button
            modifier="large"
            @click="showIdfaAlert()"
          >
            次へ
          </v-ons-button>
        </template>
      </content-with-footer>
    </div>

    <v-ons-alert-dialog
      modifier="rowfooter"
      :visible.sync="isShownIdfaAlert"
    >
      <template #title>
        ゴルフ天気にアプリとWEBの操作履歴の利用を許可しますか？
      </template>
      許可の設定により、今後も各種機能改善のご参考にさせていただきます。次へのボタン押下後のポップアップで選択してください
      <template #footer>
        <v-ons-button @click="callToIdfaDialog()">
          次へ
        </v-ons-button>
      </template>
    </v-ons-alert-dialog>
  </v-ons-page>
</template>

<script>
// components
import ContentWithFooter from '@/components/organisms/content-with-footer';

// pages
import UserNew from '@/views/user/new';

// config
import IdfaAaidPlugin from '@/config/idfa';

export default {
  name: 'FirstGuidanceIDFA',
  components: {
    ContentWithFooter,
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
        this.goToUserNew();
      }
    },
    callToIdfaDialog() {
      this.isShownIdfaAlert = false;
      IdfaAaidPlugin.init();
      const ADJUST_TOKEN = (window.device.platform === 'iOS') ? process.env.ADJUST_TOKEN_IOS : process.env.ADJUST_TOKEN_ANDROID;
      const adjustEvent = new AdjustEvent(ADJUST_TOKEN.TRIAL_STARTED_EVENT_ID);
      Adjust.trackEvent(adjustEvent);
      console.log('callToIdfaDialog');
      this.goToUserNew();
    },
    goToUserNew() {
      const ADJUST_TOKEN = (window.device.platform === 'iOS') ? process.env.ADJUST_TOKEN_IOS : process.env.ADJUST_TOKEN_ANDROID;
      const adjustEvent = new AdjustEvent(ADJUST_TOKEN.TUTORIAL_COMPLETED_EVENT_ID);
      Adjust.trackEvent(adjustEvent);
      this.$store.dispatch('appNavigator/push', UserNew);
    },
  },
};
</script>
