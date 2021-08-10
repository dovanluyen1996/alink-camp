const IdfaAaidPlugin = {
  init() {
    const idfaPlugin = cordova.plugins.idfa;

    // eslint-disable-next-line consistent-return
    idfaPlugin.getInfo().then((info) => {
      if (!info.trackingLimited) {
        return info.idfa || info.aaid;
      }

      if (info.trackingPermission === idfaPlugin.TRACKING_PERMISSION_NOT_DETERMINED) {
        // eslint-disable-next-line consistent-return
        return idfaPlugin.requestPermission().then((result) => {
          if (result === idfaPlugin.TRACKING_PERMISSION_AUTHORIZED) {
            // eslint-disable-next-line no-shadow
            return idfaPlugin.getInfo().then((info) => {
              return info.idfa || info.aaid;
            });
          }
        });
      }
    }).then((idfaOrAaid) => {
      if (idfaOrAaid) {
        console.log(idfaOrAaid);
      }
    });
  },
};

module.exports = IdfaAaidPlugin;
