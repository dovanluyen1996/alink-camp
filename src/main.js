// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import VueOnsen from '@/plugins/vue_onsenui_plugin';
import '@/plugins/global_component_plugin';
import store from '@/stores';
import App from '@/app';

Vue.config.productionTip = false;

// NOTE: enableAutoStatusBarFillは、$ons.isReady() = falseで動作するが、
//       vueのbeforeCreateではtrueになってしまうため、先に実行する
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
