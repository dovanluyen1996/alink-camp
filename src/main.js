// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import VueOnsen from '@/plugins/vue_onsenui_plugin';
import '@/plugins/global_component_plugin';
import '@/config/vee_validate';
import AdjustPlugin from '@/config/adjust';
import RevenueCat from '@/config/revenue_cat';
import store from '@/stores';
import App from '@/app';
import cognito from '@/cognito';
import helpers from '@/helpers/helper';
import VueMoment from 'vue-moment';
import moment from 'moment-timezone';

moment.tz.setDefault('Asia/Tokyo');

Vue.use(VueMoment, {
  moment,
});

Vue.config.productionTip = false;

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

// NOTE: iPhoneX対応を行うとiPhone8以下にも影響するのでこれを入れる
//       enableAutoStatusBarFillは、$ons.isReady() = falseで動作するが、
//       vueのbeforeCreateではtrueになっているため先に実行する
if (/iP(hone|(o|a)d)/.test(navigator.userAgent)) {
  console.log('isIOS', VueOnsen);
  VueOnsen.enableAutoStatusBarFill();
}

/* eslint-disable no-new */
const initializeVue = () => {
  if (window.device.platform === 'iOS') {
    VueOnsen.enableAutoStatusBarFill();
  }

  RevenueCat.init();

  if (window.device.platform !== 'browser') {
    const shouldSetEnabled = true;

    FirebasePlugin.setCrashlyticsCollectionEnabled(shouldSetEnabled, () => {
      console.log('Crashlytics data collection is enabled');
    }, (error) => {
      console.error(`Crashlytics data collection couldn't be enabled: ${error}`);
    });

    FirebasePlugin.setAnalyticsCollectionEnabled(true);
  }

  AdjustPlugin.init();

  new Vue({
    el: '#app',
    store,
    cognito,
    components: { App },
    beforeCreate() {
      this.$ons.disableAutoStyling();

      if (this.$ons.platform.isIPhoneX()) {
        document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
      }
      if (this.$ons.platform.isIOS()) {
        document.documentElement.setAttribute('onsflag-iOS-device', '');
      }
    },
    template: '<App/>',
  });
};

document.addEventListener('deviceready', initializeVue, false);

const plugin = {
  install() {
    Vue.prototype.$helpers = helpers;
  },
};

Vue.use(plugin);
