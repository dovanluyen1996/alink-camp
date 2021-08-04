<template>
  <v-ons-page>
    <div class="content">
      <greeting @click="callToPurchase" />

      <purchase-point>
        <template #title>
          いつでもゴルフ場の天気傾向を確認
        </template>
        <template #thumbnail>
          <img
            :src="require('@/assets/images/purchase-information/point-1.png')"
            alt="purchase-point-1"
          >
        </template>
        過去のお天気データを活用して最適なコースを検索できます。
      </purchase-point>

      <purchase-point :content-full-width="true">
        <template #title>
          ゴルフ場のピンポイント天気予報を提供
        </template>
        <template #thumbnail>
          <img
            :src="require('@/assets/images/purchase-information/point-2.png')"
            alt="purchase-point-1"
          >
        </template>
        晴れや雨などの天気予報に加えて、落雷の危険性や、服装提案、紫外線の予測などの詳細情報も提供しています。
      </purchase-point>

      <purchase-point>
        <template #title>
          位置情報を活用した風予測を提供
        </template>
        <template #thumbnail>
          <img
            :src="require('@/assets/images/purchase-information/point-3.png')"
            alt="purchase-point-1"
          >
        </template>
        実際にゴルフボールを打つ際に、進行方向に対してどの向きに風が吹いているか予測ができます。
      </purchase-point>

      <purchase-point>
        <template #title>
          急な天気の変化でも安心
        </template>
        <template #thumbnail>
          <img
            :src="require('@/assets/images/purchase-information/point-4.png')"
            alt="purchase-point-1"
          >
        </template>
        雨雲の接近や落雷の危険性が高まった場合もPUSH通知でご案内します。
      </purchase-point>

      <using-note />
      <purchase />

      <error-dialog
        title="課金エラーが発生しました"
        :is-visible="checkPurchaseErrorVisible"
        @close="closePurchaseError"
      />
    </div>
  </v-ons-page>
</template>

<script>
// components
import ErrorDialog from '@/components/organisms/error-dialog';
import Greeting from '@/components/organisms/purchase-information/greeting';
import PurchasePoint from '@/components/organisms/purchase-information/point';
import UsingNote from '@/components/organisms/purchase-information/using-note';
import Purchase from '@/components/organisms/purchase-information/purchase';

// pages
import StartIndex from '@/views/start';

export default {
  name: 'PurchaseInformation',
  components: {
    ErrorDialog,
    Greeting,
    PurchasePoint,
    UsingNote,
    Purchase,
  },
  data() {
    return {
      error: null,
      checkPurchaseErrorVisible: false,
    };
  },
  methods: {
    callToPurchase() {
      if (BuildInfo.debug) {
        localStorage.setItem('isCharged', true);
        return this.purchaseComplete();
      }
      return this.purchaseByRevenueCat();
    },
    purchaseByRevenueCat() {
      Purchases.getOfferings((offerings) => {
        if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
          const availablePackage = offerings.current.monthly;

          // eslint-disable-next-line no-unused-vars
          Purchases.purchasePackage(availablePackage, ({ productIdentifier, purchaserInfo }) => {
            if (Object.entries(purchaserInfo.entitlements.active).length > 0) {
              const adjustEvent = new AdjustEvent(process.env.ADJUST_TRIAL_STARTED_EVENT_ID);
              Adjust.trackEvent(adjustEvent);
              this.purchaseComplete();
            }
          },
          // eslint-disable-next-line no-unused-vars
          ({ error, userCancelled }) => {
            if (!userCancelled) {
              this.checkPurchaseErrorVisible = true;
            }
          });
        }
      }, () => {
        this.checkPurchaseErrorVisible = true;
      });
    },

    purchaseComplete() {
      this.$store.dispatch('appNavigator/replace', StartIndex);
    },

    closePurchaseError() {
      this.checkPurchaseErrorVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

/deep/ .page__background {
  background: linear-gradient(180deg, $color-green 0%, $color-green 50%, #fff 50%, #fff 100%);
}
</style>
