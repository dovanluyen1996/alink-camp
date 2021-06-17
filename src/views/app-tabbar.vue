<template>
  <v-ons-page>
    <v-ons-tabbar
      :tabs="tabs"
      :visible="true"
      :index.sync="activeIndex"
      position="bottom"
      @prechange="prechange"
      @reactive="reactive"
    />
  </v-ons-page>
</template>

<script>
import settings from '@/config/settings';

// tabs
import CourseWeatherNavigator from '@/views/course-weather/course-weather-navigator';
import CourseSearchNavigator from '@/views/course-search/course-search-navigator';
import ScoresNavigator from '@/views/scores/scores-navigator';
import WindForecastNavigator from '@/views/wind-forecast/wind-forecast-navigator';
import MenuNavigator from '@/views/menu/menu-navigator';

export default {
  data() {
    return {
      isShownMenu: false,
      lastActiveIndex: null,
      tabs: [
        {
          label: 'コース天気',
          icon: 'weather',
          page: CourseWeatherNavigator,
        },
        {
          label: 'コース検索',
          icon: 'search',
          page: CourseSearchNavigator,
        },
        {
          label: 'スコア',
          icon: 'score',
          page: ScoresNavigator,
        },
        {
          label: '風予報',
          icon: 'wind',
          page: WindForecastNavigator,
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
  },
  methods: {
    prechange(event) {
      // stylelint-disable-line max-line-length
      if (event.activeIndex === settings.views.appTabbar.tabIndexes.menu) this.openMenu(event.lastActiveIndex);
    },
    reactive(event) {
      if (event.activeIndex === settings.views.appTabbar.tabIndexes.menu) this.closeMenu();
    },
    openMenu(lastActiveIndex) {
      // NOTE: @reactiveでは前のタブがとれないので
      // メニューを表示するときは一つ前のタブを保存しておく
      this.lastActiveIndex = lastActiveIndex;
      this.isShownMenu = true;
    },
    closeMenu() {
      this.activeIndex = this.lastActiveIndex;
      this.lastActiveIndex = null;
      this.isShownMenu = false;
    },
  },
};
</script>

<style lang="scss" scoped>
$tabs: weather, search, score, wind, menu;

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

  .tabbar__item[icon="menu"].active .tabbar__icon {
    background-image: url('~@/assets/images/tabbar/close-menu.png');
  }
}
</style>
