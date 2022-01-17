<template>
  <v-ons-page>
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
import CourseWeatherNavigator from '@/views/course-weather/course-weather-navigator';
import CourseSearchNavigator from '@/views/course-search/course-search-navigator';
import PlansNavigator from '@/views/plans/plans-navigator';
import MenuNavigator from '@/views/menu/menu-navigator';
import UserStampsCampaign from '@/views/user/user-stamps/campaign';
import SpotSearchNavigator from '@/views/spot-search/spot-search-navigator';

// pages
import CourseSearchIndexPage from '@/views/course-search/index';
import PlansIndexPage from '@/views/plans/index';
import CourseWeatherIndexPage from '@/views/course-weather/index';
import SpotSearchPage from '@/views/spot-search/index';
import MenuIndexPage from '@/views/menu/index';

export default {
  components: {
    UserStampsCampaign,
  },
  data() {
    return {
      tabs: [
        {
          label: 'キャンプ天気',
          icon: 'weather',
          page: CourseWeatherNavigator,
        },
        {
          label: 'キャンプ場検索',
          icon: 'search',
          page: CourseSearchNavigator,
        },
        {
          label: 'キャンプ計画',
          icon: 'plan',
          page: PlansNavigator,
        },
        {
          label: '周辺情報',
          icon: 'nearby',
          page: SpotSearchPage,
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
      return this.$store.state.courseWeatherNavigator.isBusy
        || this.$store.state.courseSearchNavigator.isBusy
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
        this.$store.dispatch('menuNavigator/reset', MenuIndexPage);
      }
    },
    reactive(event) {
      if (this.isNavigatorBusy) return;

      switch (event.activeIndex) {
      case settings.views.appTabbar.tabIndexes.courseWeather:
        this.$store.dispatch('courseWeatherNavigator/reset', CourseWeatherIndexPage);
        break;
      case settings.views.appTabbar.tabIndexes.courseSearch:
        this.$store.dispatch('courseSearchNavigator/reset', CourseSearchIndexPage);
        break;
      case settings.views.appTabbar.tabIndexes.plans:
        this.$store.dispatch('plansNavigator/reset', PlansIndexPage);
        break;
      case settings.views.appTabbar.tabIndexes.spotSearch:
        this.$store.dispatch('spotSearchNavigator/reset', SpotSearchNavigator);
        break;
      case settings.views.appTabbar.tabIndexes.menu:
        this.$store.dispatch('menuNavigator/reset', MenuIndexPage);
        break;
      default:
        break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$tabs: weather, search, plan, nearby, menu;

/deep/ .tabbar {
  ons-icon {
    display: none;
  }

  .tabbar__item .tabbar__icon {
    margin-bottom: 6px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 28px;
  }

  @each $tab in $tabs {
    .tabbar__item[icon="#{$tab}"] .tabbar__icon {
      background-image: url('~@/assets/images/tabbar/#{$tab}.png');
    }
  }
}
</style>
