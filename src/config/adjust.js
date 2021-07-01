const AdjustPlugin = {
  init() {
    let adjustConfig;
    if (process.env.NODE_ENV === 'production') {
      // TODO: 開発環境をdevelopmentでビルドできるようになったら、本番用の実装を組み込む
      /* eslint-disable no-undef */
      adjustConfig = new AdjustConfig(
        process.env.ADJUST_TOKEN,
        AdjustConfig.EnvironmentSandbox,
        //   AdjustConfig.EnvironmentProduction,
      );
    } else if (process.env.NODE_ENV === 'development') {
      adjustConfig = new AdjustConfig(
        process.env.ADJUST_TOKEN,
        AdjustConfig.EnvironmentSandbox,
      );
    }
    adjustConfig.setLogLevel(AdjustConfig.LogLevelInfo);
    /* eslint-enable no-undef */

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

    // eslint-disable-next-line no-undef
    Adjust.create(adjustConfig);
  },
};

module.exports = AdjustPlugin;
