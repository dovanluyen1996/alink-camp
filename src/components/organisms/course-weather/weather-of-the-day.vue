<template>
  <div class="course-weather-of-the-day">
    <div class="course-weather-of-the-day__title">
      予定日当日のお天気
    </div>
    <v-ons-row>
      <v-ons-col>
        <img
          src="@/assets/images/weathers/weather/days_31.png"
          width="66px"
        >
        <div>晴れ時々雨</div>
      </v-ons-col>
      <v-ons-col>
        <course-weather-temperatures />
        <course-weather-sun
          :sunrise="forecast.sunrise"
          :sunset="forecast.sunset"
        />
      </v-ons-col>
    </v-ons-row>
  </div>
</template>

<script>
import CourseWeatherTemperatures from '@/components/organisms/course-weather/temperatures';
import CourseWeatherSun from '@/components/organisms/course-weather/sun';

export default {
  name: 'CourseWeatherOfTheDay',
  components: {
    CourseWeatherTemperatures,
    CourseWeatherSun,
  },
  props: {
    forecast: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.course-weather-of-the-day {
  text-align: center;

  &__title {
    padding: 9px;
    margin-bottom: 10px;
    font-weight: 600;
    line-height: 1;
    text-align: center;
    background: $color-th;
  }
}
</style>
