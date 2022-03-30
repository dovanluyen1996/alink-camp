export default {
  init() {
    Purchases.setDebugLogsEnabled(true);

    if (window.device.platform === 'iOS') {
      Purchases.setup(process.env.REVENUE_CAT_API_KEY_IOS);
    } else if (window.device.platform === 'Android') {
      Purchases.setup(process.env.REVENUE_CAT_API_KEY_ANDROID);
    }
  },

  // 課金確認
  // Purchases.getPurchaserInfo(
  //   (purchaserInfo) => {
  //     return Object.entries(purchaserInfo.entitlements.active).length > 0;
  //   },
  //   (error) => {
  //     console.error(error);
  //   },
  // );

  // 課金
  // Purchases.getOfferings((offerings) => {
  //   if (offerings.current !== null && offerings.current.availablePackages.length !== 0) {
  //     const availablePackage = offerings.current.monthly;
  //
  //     Purchases.purchasePackage(availablePackage, ({productIdentifier, purchaserInfo}) => {
  //       if (Object.entries(purchaserInfo.entitlements.active).length > 0) {
  //         console.log('課金完了!');
  //       }
  //     },
  //     ({error}) => {
  //       throw error;
  //     });
  //   }
  // }, (error) => {
  //   console.error(error);
  // });
};
