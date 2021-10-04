import AppTabbar from '@/views/app-tabbar';
import UserDataPage from '@/views/user/new/user-data';
import IdfaAaidPlugin from '@/config/idfa';

export default {
  computed: {
    currentUser() {
      return this.$store.state.models.currentUser.user;
    },
    isNeedUpdateData() {
      const { birthdate, gender, prefecture } = this.currentUser;
      return !birthdate || !gender || !prefecture;
    },
  },
  methods: {
    async getCurrentUser() {
      await this.$store.dispatch('models/currentUser/getUser');
    },
    async checkBeforeGoToAppTabbar() {
      await this.getCurrentUser();

      await IdfaAaidPlugin.init();
      await this.$helpers.callGeolocationPermission();
      await this.$helpers.callPushNotificationPermission();
      if (this.isNeedUpdateData) {
        this.$store.dispatch('appNavigator/push', UserDataPage);
      } else {
        this.$store.dispatch('appNavigator/push', AppTabbar);
      }
    },
  },
};
