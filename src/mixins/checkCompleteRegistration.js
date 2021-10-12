import AppTabbar from '@/views/app-tabbar';
import IdfaAaidPlugin from '@/config/idfa';

export default {
  methods: {
    async checkBeforeGoToAppTabbar() {
      await IdfaAaidPlugin.init();
      await this.$helpers.callGeolocationPermission();
      await this.$helpers.callPushNotificationPermission();

      this.$store.dispatch('appNavigator/push', AppTabbar);
    },
  },
};
