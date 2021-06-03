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
import Menu from '@/views/menu/index';

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
          icon: 'cloud',
          page: CourseWeatherNavigator,
        },
        {
          label: 'コース検索',
          icon: 'bullseye',
          page: CourseSearchNavigator,
        },
        {
          label: 'スコア',
          icon: 'golf-ball',
          page: ScoresNavigator,
        },
        {
          label: '風予報',
          icon: 'smile',
          page: WindForecastNavigator,
        },
        {
          label: 'メニュー',
          icon: 'bars',
          page: Menu,
        },
      ],
    };
  },
};
</script>
