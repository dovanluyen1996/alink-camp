<template>
  <v-ons-page>
    <v-ons-tabbar
      :tabs="tabs"
      :visible="true"
      :index.sync="activeIndex"
      animation="none"
      position="bottom"
    />
  </v-ons-page>
</template>

<script>
import CourseWeatherNavigator from '@/views/course-weather/course-weather-navigator';
import CourseSearchNavigator from '@/views/course-search/course-search-navigator';
import ScoresNavigator from '@/views/scores/scores-navigator';
import WindForecastNavigator from '@/views/wind-forecast/wind-forecast-navigator';
import MenuNavigator from '@/views/menu/menu-navigator';

export default {
  data() {
    return {
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
};
</script>

<style lang="scss" scoped>
$tabs: weather, search, score, wind, menu;

/deep/ .tabbar {
  ons-icon {
    display: none;
  }

  @each $tab in $tabs {
    .tabbar__item[icon="#{$tab}"] .tabbar__icon {
      margin-bottom: 6px;
      background-image: url('~@/assets/images/tabbar/#{$tab}.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 28px;
    }
  }
}
</style>
