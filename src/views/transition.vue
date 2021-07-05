<template>
  <v-ons-page>
    <!-- NOTE: sessionの取得終了までの時差で
    onsenUIのエラーが起こるのを回避するためのページ
    v-ons-pageの中に要素がないとonsenUIのエラーを起こすので必ず入れること -->
    <div></div>
  </v-ons-page>
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
  async created() {
    await this.checkLogin();

    // 1. 起動時にログイン済みかつ契約済みの場合、アプリトップに遷移
    // 2. 未ログインかつ契約済みの場合、ログイン画面へ遷移
    // 3. 未ログインかつ未契約の場合、サブスクリプションのページ
    // // TODO 7/5現在 サブスクの契約状態の判別が出来ないため、一旦ログインしているかでページ遷移先を実装
    this.$store.dispatch('appNavigator/push', this.isLogin ? AppTabbar : PurchaseInformation);
  },
  methods: {
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
