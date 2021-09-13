<template>
  <div>
    <app-navigator />
    <api-error-dialog />

    <error-dialog
      title="課金エラーが発生しました"
      :is-visible="checkChargedStatusErrorVisible"
      @close="closeCheckChargedStatusError"
    />
  </div>
</template>

<script>
import AppNavigator from '@/views/app-navigator';
import ApiErrorDialog from '@/components/organisms/api-error-dialog';
import PurchaseInformation from '@/views/purchase-information';

import ErrorDialog from '@/components/organisms/error-dialog';

export default {
  name: 'App',
  components: {
    AppNavigator,
    ApiErrorDialog,
    ErrorDialog,
  },
  data() {
    return {
      checkChargedStatusErrorVisible: false,
    };
  },
  mounted() {
    document.addEventListener('resume', this.onResume, false);
  },
  methods: {
    async onResume() {
      if (!BuildInfo.debug) this.checkChargedStatus();
    },
    async checkChargedStatus() {
      Purchases.getPurchaserInfo(
        async(purchaserInfo) => {
          const isCharged = Object.entries(purchaserInfo.entitlements.active).length > 0;

          if (!isCharged) await this.$store.dispatch('appNavigator/push', PurchaseInformation);
        },
        () => {
          // 全画面共通のエラーメッセージを表示したい
          this.checkChargedStatusErrorVisible = true;
          this.$store.dispatch('appNavigator/push', PurchaseInformation);
        },
      );
    },
    closeCheckChargedStatusError() {
      this.checkChargedStatusErrorVisible = false;
    },
  },
};
</script>
