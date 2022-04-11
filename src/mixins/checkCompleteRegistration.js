import AppTabbar from '@/views/app-tabbar';
import IdfaAaidPlugin from '@/config/idfa';
import PurchaseInformation from '@/views/purchase-information';

export default {
  methods: {
    async checkBeforeGoToAppTabbar() {
      if (!BuildInfo.debug) this.checkChargedStatus();
      await IdfaAaidPlugin.init();
      await this.$helpers.callGeolocationPermission();
      await this.$helpers.callPushNotificationPermission();

      this.$store.dispatch('appNavigator/push', AppTabbar);
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
  },
};
