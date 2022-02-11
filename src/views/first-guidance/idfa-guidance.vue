<template>
  <v-ons-page>
    <custom-toolbar
      modifier="green"
      title="スコアデータ保存"
      :disabled-back-button="true"
    />

    <div class="content">
      <content-with-footer class="guidance-content">
        <div class="guidance-content__box">
          <img
            src="@/assets/images/guidances/campsite-items.png"
            width="195px"
          >
          <img
            src="@/assets/images/guidances/tasks.png"
            width="86px"
          >
        </div>
        <p>
          キャンプに必要な道具などの登録もできるのでご活用ください。<br>
          アカウント設定で、データが保存されます。
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
import ContentWithFooter from '@/components/organisms/content-with-footer';

// pages
import AppTabbar from '@/views/app-tabbar';

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
.guidance-content {
  &__box {
    display: flex;
    gap: 7px;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 260px;

    & > img:last-child {
      margin-top: 10px;
    }
  }
}

/deep/ {
  .alert-dialog-content {
    font-size: 16px;
    font-weight: 300;
  }
}
</style>
