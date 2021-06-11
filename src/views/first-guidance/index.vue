<template>
  <v-ons-page>
    <custom-toolbar title="初回案内" />
    <div class="content">
      <v-ons-carousel
        :index.sync="carouselIndex"
        fullscreen
        auto-scroll
        overscrollable
      >
        <v-ons-carousel-item>
          <v-ons-card>
            初回案内1
          </v-ons-card>
        </v-ons-carousel-item>

        <v-ons-carousel-item>
          <v-ons-card>
            初回案内2
          </v-ons-card>
        </v-ons-carousel-item>

        <v-ons-carousel-item>
          <v-ons-card>
            初回案内3
          </v-ons-card>
        </v-ons-carousel-item>

        <v-ons-carousel-item>
          <v-ons-card>
            初回案内4
          </v-ons-card>
        </v-ons-carousel-item>
      </v-ons-carousel>

      <fixed-footer>
        <v-ons-button @click="clickNext">
          次へ
        </v-ons-button>
      </fixed-footer>

      <v-ons-alert-dialog
        modifier="rowfooter"
        :visible.sync="isShownIdfaAlert"
      >
        <template #title>
          ゴルフ天気にアプリとWEBの操作履歴の利用を許可しますか？
        </template>
        許可の設定により、今後も各種機能改善のご参考にさせていただきます。次へのボタン押下後のポップアップで選択してください
        <template #footer>
          <v-ons-button @click="callToIdfaDialog()">次へ</v-ons-button>
        </template>
      </v-ons-alert-dialog>
    </div>
  </v-ons-page>
</template>

<script>
// components
import FixedFooter from '@/components/organisms/fixed-footer';

const CAROUSEL_INDEXES = {
  TOP: 0,
  LOCATION_SERVICES: 1,
  PUSH_NOTIFICATIONS: 2,
  IDFA: 3,
};

export default {
  name: 'FIrstGuidance',
  components: {
    FixedFooter,
  },
  data() {
    return {
      carouselIndex: 0,
      isShownIdfaAlert: false,
    };
  },
  methods: {
    clickNext() {
      switch (this.carouselIndex) {
      case CAROUSEL_INDEXES.TOP:
        this.showNextCaroudel();
        break;

      case CAROUSEL_INDEXES.LOCATION_SERVICES:
        this.callToLocationServicesDialog();
        break;

      case CAROUSEL_INDEXES.PUSH_NOTIFICATIONS:
        this.callToPushNotificationDialog();
        break;

      case CAROUSEL_INDEXES.IDFA:
        this.showIdfaAlert();
        break;

      default:
        break;
      }
    },
    callToLocationServicesDialog() {
      // TODO: location servicesのダイアログを出してください
      console.log('callToLocationServicesDialog');
      this.showNextCaroudel();
    },
    callToPushNotificationDialog() {
      // TODO: Push notificationsのダイアログを出してください
      console.log('callToLocationServicesDialog');
      this.showNextCaroudel();
    },
    showIdfaAlert() {
      this.isShownIdfaAlert = true;
    },
    callToIdfaDialog() {
      this.isShownIdfaAlert = false;
      // TODO: IDFAのダイアログを出してください
      console.log('callToIdfaDialog');
    },
    showNextCaroudel() {
      this.carouselIndex += 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.call-to-purchase {
  height: auto;
}
</style>
