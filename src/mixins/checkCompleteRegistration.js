import AppTabbar from '@/views/app-tabbar';
import UserDataPage from '@/views/user/new/user-data';

export default {
  computed: {
    currentUser() {
      return this.$store.state.models.currentUser.user;
    },
    isNeedUpdateData() {
      return !this.currentUser.birthdate;
    },
  },
  methods: {
    async getCurrentUser() {
      await this.$store.dispatch('models/currentUser/getUser');
    },
    async checkBeforeGoToAppTabbar() {
      await this.getCurrentUser();

      if (this.isNeedUpdateData) {
        this.$store.dispatch('appNavigator/push', UserDataPage);
      } else {
        this.$store.dispatch('appNavigator/push', AppTabbar);
      }
    },
  },
};
