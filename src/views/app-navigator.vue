<template>
  <v-ons-navigator
    :page-stack="pageStack"
    :pop-page="popPage"
  />
</template>

<script>
import AppTabbar from '@/views/app-tabbar';
import PurchaseInformation from '@/views/purchase-information';

export default {
  data() {
    return {
      isLogin: false,
    };
  },
  computed: {
    pageStack() {
      return this.$store.state.appNavigator.stack;
    },
    loginStatus() {
      return this.isLogin;
    },
  },
  async created() {
    await this.checkLogin();
    // 1. 起動時にログイン済みかつ契約済みの場合、アプリトップに遷移
    // 2. 未ログインかつ契約済みの場合、ログイン画面へ遷移
    // 3. 未ログインかつ未契約の場合、サブスクリプションのページ
    // TODO 7/2現在 サブスクの契約状態の判別が出来ないため、一旦ログインしているかでページ遷移先を実装
    this.$store.dispatch('appNavigator/push', this.loginStatus ? AppTabbar : PurchaseInformation);
  },
  methods: {
    popPage() {
      this.$store.dispatch('appNavigator/pop');
    },
    async checkLogin() {
      try {
        const session = await this.$cognito.isAuthenticated();

        this.isLogin = session ? true : false;
      } catch (err) {
        console.log(err);

        this.isLogin = false;
      }
    },
  },
};
</script>
