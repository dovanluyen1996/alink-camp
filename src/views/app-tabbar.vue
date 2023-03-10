<template>
  <!-- NOTE: ログインページと行き来するために親にnavigatorがいるのでv-ons-pageは必須 -->
  <v-ons-page>
    <!-- WARNING: 認証エラーなどでスタート画面に戻るときに何故かonsenUIのコンパイルが走るらしい
             おそらくappNavigationのreset時にapp-tabbarが消えているのにコンパイルしようとしている
             そのためエラーが走るのでonsenUIに左右されない空のdivも必須
             .contentはコンパイルに巻き込まれるので不可 -->
    <div>
      <v-ons-tabbar
        :tabs="tabs"
        :visible="true"
        :index.sync="activeIndex"
        animation="none"
        position="bottom"
        @prechange="prechange"
        @reactive="reactive"
      />
      <user-stamps-campaign />
    </div>
  </v-ons-page>
</template>

<script>
import settings from '@/config/settings';

// tabs
import CampsiteWeatherNavigator from '@/views/campsite-weather/campsite-weather-navigator';
import CampsiteSearchNavigator from '@/views/campsite-search/campsite-search-navigator';
import PlansNavigator from '@/views/plans/plans-navigator';
import MenuNavigator from '@/views/menu/menu-navigator';
import UserStampsCampaign from '@/views/user/user-stamps/campaign';
import SpotSearchNavigator from '@/views/spot-search/spot-search-navigator';

export default {
  name: 'AppTabbar',
  components: {
    UserStampsCampaign,
  },
  data() {
    return {
      tabs: [
        {
          label: 'キャンプ天気',
          icon: 'weather',
          page: CampsiteWeatherNavigator,
        },
        {
          label: 'キャンプ場検索',
          icon: 'search',
          page: CampsiteSearchNavigator,
        },
        {
          label: 'キャンプ計画',
          icon: 'plan',
          page: PlansNavigator,
        },
        {
          label: '周辺情報',
          icon: 'nearby',
          page: SpotSearchNavigator,
        },
        {
          label: 'メニュー',
          icon: 'menu',
          page: MenuNavigator,
        },
      ],
    };
  },
  computed: {
    activeIndex: {
      get() {
        return this.$store.state.appTabbar.activeIndex;
      },
      set(index) {
        this.$store.commit('appTabbar/setActiveIndex', index);
      },
    },
    isNavigatorBusy() {
      return this.$store.state.campsiteWeatherNavigator.isBusy
        || this.$store.state.campsiteSearchNavigator.isBusy
        || this.$store.state.plansNavigator.isBusy
        || this.$store.state.spotSearchNavigator.isBusy
        || this.$store.state.menuNavigator.isBusy;
    },
  },
  methods: {
    prechange(event) {
      if (this.isNavigatorBusy) {
        event.cancel();
        return;
      }

      // When click to other tab,
      // if menu is open other page, reset menu
      // If menu is open menu items only, no reset
      if (this.$store.state.menuNavigator.stack.length > 1) {
        this.$store.dispatch('menuNavigator/reset');
      }
    },
    reactive(event) {
      if (this.isNavigatorBusy) return;

      switch (event.activeIndex) {
      case settings.views.appTabbar.tabIndexes.campsiteWeather:
        this.$store.dispatch('campsiteWeatherNavigator/reset');
        break;
      case settings.views.appTabbar.tabIndexes.campsiteSearch:
        this.$store.dispatch('campsiteSearchNavigator/reset');
        break;
      case settings.views.appTabbar.tabIndexes.plans:
        this.$store.dispatch('plansNavigator/reset');
        break;
      case settings.views.appTabbar.tabIndexes.spotSearch:
        this.$store.dispatch('spotSearchNavigator/reset');
        break;
      case settings.views.appTabbar.tabIndexes.menu:
        this.$store.dispatch('menuNavigator/reset');
        break;
      default:
        break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
$tabs: weather, search, plan, nearby, menu;

/deep/ {
  // NOTE: iPhoneX未満で端末のツールバーの背景が赤くなるようにする
  //       認証エラーでスタート画面に戻るときにコンパイルエラーが発生するのを防止するためにtemlateに.backgroundを追加できない
  //       そのためdeepにしている
  > .page__background {
    background: $color-toolbar;
  }

  .tabbar {
    ons-icon {
      display: none;
    }

    .tabbar__item .tabbar__icon {
      margin-bottom: 6px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 32px 28px;
    }

    @each $tab in $tabs {
      .tabbar__item[icon="#{$tab}"] .tabbar__icon {
        background-image: url('~@/assets/images/tabbar/#{$tab}.png');
      }
    }
  }
}
</style>
