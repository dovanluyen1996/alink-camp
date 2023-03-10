<template>
  <v-ons-page>
    <custom-toolbar title="キャンプ天気会員登録" />
    <loading :visible="isLoading" />
    <div class="background" />
    <div class="content">
      <content-with-footer>
        <greeting />

        <purchase-point>
          <template #title>
            長期間の天気傾向データを提供
          </template>
          <template #thumbnail>
            <img
              src="@/assets/images/purchase-information/point-1.png"
              class="purchase-information__point"
              height="150px"
              width="116px"
            >
          </template>
          1ヶ月先の気温や降水量の予測情報をご提供します。また、年間の天気や気温の傾向を確認することができます。
        </purchase-point>

        <purchase-point>
          <template #title>
            最新情報をPUSH通知
          </template>
          <template #thumbnail>
            <img
              src="@/assets/images/purchase-information/point-2.png"
              width="132px"
              height="148px"
            >
          </template>
          通知をONにする事で、キャンプ中の雨雲の接近や落雷＆突風危険度など、様々な最新の情報をお知らせします。
        </purchase-point>

        <purchase-point>
          <template #title>
            予定作成が無制限に
          </template>
          <template #thumbnail>
            <img
              src="@/assets/images/purchase-information/point-3.png"
              width="132px"
              height="148px"
            >
          </template>
          キャンプ場ごとに保存できる計画や思い出を、個数の制限なしに作成・保存できるようになります。
        </purchase-point>

        <purchase-point>
          <template #title>
            豊富な気象情報の提供
          </template>
          <template #thumbnail>
            <img
              src="@/assets/images/purchase-information/point-4.png"
              width="132px"
              height="172px"
            >
          </template>
          紫外線、落雷、星空の見やすさなどを指数でご提供します。<br>
          また、ログインキャンペーンで特別なプレゼントへの抽選にも参加頂けます。
        </purchase-point>

        <purchase-information-price />

        <template #footer>
          <div class="purchase">
            <div class="purchase__top">
              <p>＼初めてご利用の方限定／</p>
            </div>
            <div
              class="purchase__content"
              @click="callToPurchase()"
            >
              <span>1ヶ月無料で試してみる</span><br>
              <span>無料期間後：月額240円</span>
            </div>
            <div
              class="purchase__action"
              @click="restorePurchase()"
            >
              購入状態を復元する方はこちら
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
import PurchaseInformationPrice from '@/components/organisms/purchase-information/price';

export default {
  name: 'PurchaseInformation',
  components: {
    ContentWithFooter,
    ErrorDialog,
    Greeting,
    PurchasePoint,
    PurchaseInformationPrice,
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
      if (BuildInfo.debug || window.device.platform === 'browser') {
        this.$store.dispatch('purchase/setIsPurchased', true);
        return this.purchaseComplete();
      }
      return this.purchaseByRevenueCat();
    },
    purchaseByRevenueCat() {
      this.isLoading = true;
      Purchases.getOfferings((offerings) => {
        if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
          const availablePackage = offerings.current.monthly;

          Purchases.purchasePackage(
            // eslint-disable-next-line no-unused-vars
            availablePackage, async({ productIdentifier, purchaserInfo }) => {
              if (Object.entries(purchaserInfo.entitlements.active).length > 0) {
                // 課金の識別子をサーバへ送る
                const params = {
                  app_user_id: purchaserInfo.originalAppUserId,
                  app_user_os: window.device.platform.toLowerCase(),
                };
                await this.$store.dispatch('models/currentUser/updateUser', params);

                this.$store.dispatch('purchase/setIsPurchased', true);
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
            },
          );
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
        async(restoredInfo) => {
          const entitlements = restoredInfo.entitlements.all;
          const targetEntitlement = entitlements[process.env.REVENUE_CAT_ENTITLEMENT_USE_APP];
          if (targetEntitlement.isActive) {
            // 課金の識別子をサーバへ送る
            const params = {
              app_user_id: restoredInfo.originalAppUserId,
              app_user_os: window.device.platform.toLowerCase(),
            };
            await this.$store.dispatch('models/currentUser/updateUser', params);

            this.$store.dispatch('purchase/setIsPurchased', true);
            this.purchaseComplete();
          } else {
            this.checkPurchaseErrorVisible = true;
            this.errorMessage = '購入状態を復元できません。定期購入期間が終了している可能性があります。お手数ですがご確認下さい。';
          }
          this.isLoading = false;
        },
        () => {
          this.checkPurchaseErrorVisible = true;
          this.errorMessage = '購入状態を復元できません。定期購入期間が終了している可能性があります。お手数ですがご確認下さい。';
          this.isLoading = false;
        },
      );
    },

    purchaseComplete() {
      this.$el.querySelector('ons-back-button').click();
    },

    closePurchaseError() {
      this.checkPurchaseErrorVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.background {
  background: $color-purchase-dark;
}

.purchase-information__point {
  margin-right: 10px;
}

.purchase {
  text-align: center;
  background-color: $color-default;

  &__top {
    padding: 15px 0 5px;

    p {
      margin: 0;
      font-size: 17px;
      font-weight: bold;
      line-height: 18px;
      color: $color-purchase-gold;
    }
  }

  &__content {
    max-height: 54px;
    padding: 6px 0 8px;
    margin: 0 28px;
    font-size: 17px;
    font-weight: bold;
    color: #fff;
    background-color: #c0a243;
    border-radius: 7px;

    span:first-child {
      font-size: 24px;
      font-weight: bold;
    }

    span:last-of-type {
      font-size: 15px;
      font-weight: normal;
    }
  }

  &__action {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 38px;
    font-size: $font-size-small;
    line-height: 1;
    color: #fff;
    text-align: center;
    text-decoration: underline;
  }
}

/deep/ {
  .custom-toolbar-title {
    display: flex;
    justify-content: center;
    white-space: nowrap;
  }

  .content-with-footer__footer {
    padding: 0;
    background-color: $color-default;
  }
}

@media screen and (max-width: 374px) {
  .purchase__content {
    margin: 0 20px;
  }
}
</style>
