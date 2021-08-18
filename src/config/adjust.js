const AdjustPlugin = {
  init() {
    const ADJUST_TOKEN = (window.device.platform === 'iOS') ? process.env.ADJUST_TOKEN_IOS : process.env.ADJUST_TOKEN_ANDROID;

    let adjustConfig;
    if (process.env.NODE_ENV === 'production') {
      // TODO: 開発環境をdevelopmentでビルドできるようになったら、本番用の実装を組み込む
      adjustConfig = new AdjustConfig(
        ADJUST_TOKEN.APP_TOKEN,
        AdjustConfig.EnvironmentSandbox,
        //   AdjustConfig.EnvironmentProduction,
      );
    } else if (process.env.NODE_ENV === 'development') {
      adjustConfig = new AdjustConfig(
        ADJUST_TOKEN.APP_TOKEN,
        AdjustConfig.EnvironmentSandbox,
      );
    }
    adjustConfig.setLogLevel(AdjustConfig.LogLevelInfo);

    // adjustConfig.setEventTrackingSucceededCallbackListener((eventSuccess) => {
    //   // Printing all event success properties.
    //   console.log('Event tracking succeeded!');
    //   console.log(eventSuccess.message);
    //   console.log(eventSuccess.timestamp);
    //   console.log(eventSuccess.eventToken);
    //   console.log(eventSuccess.callbackId);
    //   console.log(eventSuccess.adid);
    //   console.log(eventSuccess.jsonResponse);
    // });

    // adjustConfig.setEventTrackingFailedCallbackListener((eventFailure) => {
    //   // Printing all event failure properties.
    //   console.log('Event tracking failed!');
    //   console.log(eventFailure.message);
    //   console.log(eventFailure.timestamp);
    //   console.log(eventFailure.eventToken);
    //   console.log(eventFailure.callbackId);
    //   console.log(eventFailure.adid);
    //   console.log(eventFailure.willRetry);
    //   console.log(eventFailure.jsonResponse);
    // });

    Adjust.create(adjustConfig);
  },
};

module.exports = AdjustPlugin;
