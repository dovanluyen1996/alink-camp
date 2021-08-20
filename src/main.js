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
import settings from '@/config/settings';

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

const resetTabPage = (tabbarActiveIndex) => {
  switch (tabbarActiveIndex) {
  case settings.views.appTabbar.tabIndexes.courseSearch:
    if (store.state.courseSearchNavigator.stack.length > 1) {
      store.dispatch('courseSearchNavigator/pop');
    } else {
      store.commit('appTabbar/setActiveIndex', settings.views.appTabbar.tabIndexes.courseWeather);
    }
    break;
  case settings.views.appTabbar.tabIndexes.scores:
    if (store.state.scoresNavigator.stack.length > 1) {
      store.dispatch('scoresNavigator/pop');
    } else {
      store.commit('appTabbar/setActiveIndex', settings.views.appTabbar.tabIndexes.courseWeather);
    }
    break;
  case settings.views.appTabbar.tabIndexes.windForecast:
    if (store.state.windForecastNavigator.stack.length > 1) {
      store.dispatch('windForecastNavigator/pop');
    } else {
      store.commit('appTabbar/setActiveIndex', settings.views.appTabbar.tabIndexes.courseWeather);
    }
    break;
  case settings.views.appTabbar.tabIndexes.menu:
    if (store.state.menuNavigator.stack.length > 1) {
      store.dispatch('menuNavigator/pop');
    } else {
      store.commit('appTabbar/setActiveIndex', settings.views.appTabbar.tabIndexes.courseWeather);
    }
    break;
  default:
    break;
  }
};

const onBackButton = (event) => {
  // check appTabbar index
  const tabbarActiveIndex = store.state.appTabbar.activeIndex;

  // If active index is App Top -> move to background
  //
  // If active index isn't App Top
  // -> check is open other page in each tab
  //    -> If open other page -> back to previous screen like button 「<」
  //    -> If is openning Top Page of Tab -> set Active Tab to App Top
  if (tabbarActiveIndex === settings.views.appTabbar.tabIndexes.courseWeather) {
    cordova.plugins.backgroundMode.moveToBackground();
  } else {
    resetTabPage(tabbarActiveIndex);
  }

  // To prevent back button exit application event.
  event.preventDefault();
  event.stop();

  return false;
};

document.addEventListener('deviceready', initializeVue, false);
document.addEventListener('backbutton', onBackButton, false);

const plugin = {
  install() {
    Vue.prototype.$helpers = helpers;
  },
};

Vue.use(plugin);
