<template>
  <div class="course-weather-the-day-before">
    <div class="course-weather-the-day-before-title">
      <span>予定日前日</span><span>のお天気</span>
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
  display: grid;
  padding: 8px 10px 10px;
  text-align: center;
  border: 1px solid #d9d9d9;
}

.course-weather-the-day-before-title {
  @include title-style;

  margin-bottom: 10px;
  font-size: $font-size-small;

  span {
    display: inline-block;
  }
}

.weather {
  margin-bottom: 10px;
}

.course-weather-temperatures {
  align-self: flex-end;
}
</style>
