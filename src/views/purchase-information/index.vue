<template>
  <v-ons-page>
    <div class="content">
      <content-with-footer>
        <v-ons-card>
          月額案内1
        </v-ons-card>

        <v-ons-card>
          月額案内2
        </v-ons-card>

        <v-ons-card>
          月額案内3
        </v-ons-card>

        <v-ons-card>
          月額案内4
        </v-ons-card>

        <template #footer>
          <v-ons-button
            modifier="cta"
            class="call-to-purchase"
            @click="callToPurchase"
          >
            利用開始する<br>
            <small>（初月無料月額￥〇〇〇）</small>
          </v-ons-button>
        </template>
      </content-with-footer>

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
import ContentWithFooter from '@/components/organisms/content-with-footer';
import ErrorDialog from '@/components/organisms/error-dialog';

// pages
import StartIndex from '@/views/start';

export default {
  name: 'PurchaseInformation',
  components: {
    ContentWithFooter,
    ErrorDialog,
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
.call-to-purchase {
  height: auto;
}
</style>
