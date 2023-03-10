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

import ApiClient from '@/api_client';

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
      if (await this.isAuthenticated()) {
        // 課金の識別子をサーバへ送る
        const params = {
          app_user_id: purchaserInfo.originalAppUserId,
          app_user_os: window.device.platform.toLowerCase(),
        };
        await this.$store.dispatch('models/currentUser/updateUser', params);
      }

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
          if (await this.isAuthenticated()) {
            // 課金の識別子をサーバへ送る
            const params = {
              app_user_id: purchaserInfo.originalAppUserId,
              app_user_os: window.device.platform.toLowerCase(),
            };
            await this.$store.dispatch('models/currentUser/updateUser', params);
          }

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
    async isAuthenticated() {
      const sessionHeaders = await ApiClient.buildSessionHeaders();

      return this.$helpers.isPresentObject(sessionHeaders);
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
