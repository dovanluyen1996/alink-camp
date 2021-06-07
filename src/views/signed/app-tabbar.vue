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
import CourseWeatherNavigator from '@/views/signed/course-weather/course-weather-navigator';
import CourseSearchNavigator from '@/views/signed/course-search/course-search-navigator';
import ScoresNavigator from '@/views/signed/scores/scores-navigator';
import WindForecastNavigator from '@/views/signed/wind-forecast/wind-forecast-navigator';
import Menu from '@/views/signed/menu/index';

const TAB_INDEXES = {
  COURSE_WEATHER: 0,
  COURSE_SEARCH: 1,
  SCORES: 2,
  WIND_FORECAST: 3,
  MENU: 4,
};

export default {
  data() {
    return {
      activeIndex: TAB_INDEXES.COURSE_WEATHER,
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
          page: Menu,
        },
      ],
    };
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
      background-position: center;
      background-repeat: no-repeat;
      background-image: url(~@/assets/images/tabbar/#{$tab}.png);
    }
  }
}
</style>
