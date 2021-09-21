<template>
  <v-ons-page>
    <div class="content">
      <loading :visible="isLoading" />
      <content-with-footer>
        <greeting />

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
            位置情報を活用した風予報を提供
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
          予定日の天気予報やプレイ中に雨雲の接近の危険性が高まった場合もPUSH通知でご案内します。
        </purchase-point>

        <using-note />

        <template #footer>
          <div class="purchase">
            <div
              class="purchase__content"
              @click.self="callToPurchase()"
            >
              <span>利用を開始する</span><br>
              <span>（初回7日間無料月額￥360）</span>
              <v-ons-button
                modifier="rounded"
                @click="restorePurchase()"
              >
                以前購入した方はこちらから復元
              </v-ons-button>
            </div>
          </div>
        </template>
      </content-with-footer>

      <error-dialog
        title="課金エラーが発生しました"
        :error-message="errorMessage"
        :is-visible="checkPurchaseErrorVisible"
        @close="closePurchaseError"
      />
    </div>
  </v-ons-page>
</template>

<script>
// components
import ContentWithFooter from '@/components/organisms/content-with-footer';
import ErrorDialog from '@/components/organisms/error-dialog';
import Greeting from '@/components/organisms/purchase-information/greeting';
import PurchasePoint from '@/components/organisms/purchase-information/point';
import UsingNote from '@/components/organisms/purchase-information/using-note';

// pages
import StartIndex from '@/views/start';

export default {
  name: 'PurchaseInformation',
  components: {
    ContentWithFooter,
    ErrorDialog,
    Greeting,
    PurchasePoint,
    UsingNote,
  },
  data() {
    return {
      error: null,
      errorMessage: '',
      checkPurchaseErrorVisible: false,
      isLoading: false,
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
      this.isLoading = true;
      Purchases.getOfferings((offerings) => {
        if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
          const availablePackage = offerings.current.monthly;

          // eslint-disable-next-line no-unused-vars
          Purchases.purchasePackage(availablePackage, ({ productIdentifier, purchaserInfo }) => {
            if (Object.entries(purchaserInfo.entitlements.active).length > 0) {
              this.purchaseComplete();
            }
            this.isLoading = false;
          },
          // eslint-disable-next-line no-unused-vars
          ({ error, userCancelled }) => {
            if (!userCancelled) {
              this.checkPurchaseErrorVisible = true;
              const RestorableErrorCode = 6;
              this.errorMessage = error.code === RestorableErrorCode ? 'すでに購入済みのアプリです。課金情報を復元してください' : '';
            }
            this.isLoading = false;
          });
        } else {
          this.isLoading = false;
        }
      }, () => {
        this.checkPurchaseErrorVisible = true;
        this.isLoading = false;
      });
    },

    restorePurchase() {
      this.isLoading = true;
      Purchases.restoreTransactions(
        (restoredInfo) => {
          const entitlements = restoredInfo.entitlements.all;
          const targetEntitlement = entitlements[process.env.REVENUE_CAT_ENTITLEMENT_USE_APP];
          if (targetEntitlement.isActive) {
            this.purchaseComplete();
          } else {
            this.checkPurchaseErrorVisible = true;
            this.errorMessage = '課金状態を復元できません';
          }
          this.isLoading = false;
        },
        () => {
          this.checkPurchaseErrorVisible = true;
          this.errorMessage = '課金状態を復元できません';
          this.isLoading = false;
        },
      );
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

.purchase {
  border-top: 4px solid #fff;

  &__content {
    padding: 20px 25px;
    font-size: 30px;
    font-weight: 600;
    color: #fff;
    text-align: center;
    background-color: $color-orange;

    span:first-child {
      text-decoration: underline;
      text-underline-offset: 4px;
    }

    span:last-of-type {
      font-size: 20px;
    }
  }
}

/deep/ {
  .page__background {
    background:
      linear-gradient(
        180deg,
        $color-green 0%,
        $color-green 50%,
        $color-orange 50%,
        $color-orange 100%
      );
  }

  .page__content {
    font-size: 0;
  }

  .content-with-footer {
    &__footer {
      bottom: -1px !important;
      padding: 0 !important;
    }
  }

  .purchase .button[class*="button--rounded"] {
    width: 100%;
    height: 44px;
    margin: 22px 0 0 0;
    font-size: 14px;
    line-height: 36px;
    color: #fff;
    background-color: #9f9a97;
    border-radius: 30px;
  }
}
</style>
