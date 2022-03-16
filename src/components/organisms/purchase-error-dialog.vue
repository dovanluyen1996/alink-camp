<template>
  <error-dialog
    title="課金エラーが発生しました"
    :is-visible="checkChargedStatusErrorVisible"
    @close="closeCheckChargedStatusError"
  />
</template>

<script>
import PurchaseInformation from '@/views/purchase-information';

import ErrorDialog from '@/components/organisms/error-dialog';

export default {
  name: 'ApiErrorDialog',
  components: {
    ErrorDialog,
  },
  data() {
    return {
      checkChargedStatusErrorVisible: false,
    };
  },
  mounted() {
    document.addEventListener('resume', this.onResume, false);

    window.addEventListener('onPurchaserInfoUpdated', async(purchaserInfo) => {
      const isCharged = Object.entries(purchaserInfo.entitlements.active).length > 0;
      this.$store.dispatch('purchase/setIsPurchased', isCharged);
    },
    () => {
      // 全画面共通のエラーメッセージを表示したい
      this.checkChargedStatusErrorVisible = true;
      this.$store.dispatch('appNavigator/reset', PurchaseInformation);
    });
  },
  beforeDestroy() {
    document.removeEventListener('resume', this.onResume);
  },
  methods: {
    onResume() {
      if (!BuildInfo.debug) this.checkChargedStatus();
    },
    async checkChargedStatus() {
      Purchases.getPurchaserInfo(
        async(purchaserInfo) => {
          const isCharged = Object.entries(purchaserInfo.entitlements.active).length > 0;
          this.$store.dispatch('purchase/setIsPurchased', isCharged);
        },
        () => {
          // 全画面共通のエラーメッセージを表示したい
          this.checkChargedStatusErrorVisible = true;
          this.$store.dispatch('appNavigator/reset', PurchaseInformation);
        },
      );
    },
    closeCheckChargedStatusError() {
      this.checkChargedStatusErrorVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.error-content {
  margin: 0;
  white-space: pre-line;
}
</style>
