<template>
  <v-ons-page>
    <custom-toolbar title="初回案内" />

    <div class="content">
      <content-with-footer>
        <v-ons-card>
          idfaの説明文
        </v-ons-card>

        <template #footer>
          <v-ons-button @click="showIdfaAlert()">
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
      this.isShownIdfaAlert = true;
    },
    callToIdfaDialog() {
      this.isShownIdfaAlert = false;
      // TODO: IDFAのダイアログを出してください
      console.log('callToIdfaDialog');
      this.goToUserNew();
    },
    goToUserNew() {
      const adjustEvent = new AdjustEvent(process.env.ADJUST_TUTORIAL_COMPLETED_EVENT_ID);
      Adjust.trackEvent(adjustEvent);
      this.$store.dispatch('appNavigator/push', UserNew);
    },
  },
};
</script>
