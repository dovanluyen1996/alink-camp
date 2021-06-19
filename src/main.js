// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import VueOnsen from '@/plugins/vue_onsenui_plugin';
import '@/plugins/global_component_plugin';
import '@/config/vee_validate';
import store from '@/stores';
import App from '@/app';

Vue.config.productionTip = false;

// NOTE: iPhoneX対応を行うとiPhone8以下にも影響するのでこれを入れる
//       enableAutoStatusBarFillは、$ons.isReady() = falseで動作するが、
//       vueのbeforeCreateではtrueになっているため先に実行する
if (/iP(hone|(o|a)d)/.test(navigator.userAgent)) {
  console.log('isIOS', VueOnsen);
  VueOnsen.enableAutoStatusBarFill();
}
/* TODO: アプリ化対応時にonDeviceReadyに移動&書き換えてください
onDeviceReady() {
  if (window.device.platform === 'iOS') {
    VueOnsen.enableAutoStatusBarFill();
  }
}
*/

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: { App },
  beforeCreate() {
    this.$ons.disableAutoStyling();

    if (this.$ons.platform.isIPhoneX()) {
      document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
    }
  },
  template: '<App/>',
});
