<template>
  <div class="course-weather-the-day-before">
    <div class="course-weather-the-day-before__title">
      予定日前日の<br>お天気
    </div>
    <weather-image
      :weather-id="forecast.weather"
      :is-shown-name="true"
      image-width="66px"
    />
    <course-weather-temperatures
      :high="20"
      :low="10"
    />
  </div>
</template>

<script>
// components
import WeatherImage from '@/components/atoms/weather-image';
import CourseWeatherTemperatures from '@/components/organisms/course-weather/temperatures';

export default {
  name: 'CourseWeatherTheDayBefore',
  components: {
    WeatherImage,
    CourseWeatherTemperatures,
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
@import '@/assets/scss/_mixins.scss';
@import '@/assets/scss/_variables.scss';

.course-weather-the-day-before {
  box-sizing: border-box;
  padding: 8px 10px 10px;
  border: 1px solid #d9d9d9;
  text-align: center;

  &__title {
    @include title-style;
    margin-bottom: 10px;
    font-size: $font-size-small;
  }
}
.weather {
  margin-bottom: 10px;
}
</style>
