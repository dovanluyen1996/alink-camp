<template>
  <div>
    <app-navigator />
    <api-error-dialog />
  </div>
</template>

<script>
import AppNavigator from '@/views/app-navigator';
import ApiErrorDialog from '@/components/organisms/api-error-dialog';
import PurchaseInformation from '@/views/purchase-information';

export default {
  name: 'App',
  components: {
    AppNavigator,
    ApiErrorDialog,
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
  },
};
</script>
