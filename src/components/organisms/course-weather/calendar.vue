<template>
  <v-ons-row class="course-weather-calendar">
    <v-ons-col
      v-for="(forecast, index) in forecasts"
      :key="index"
      width="25%"
      class="course-weather-day"
    >
      <div class="course-weather-day-date">
        {{ forecast.date }}
      </div>
      <div class="course-weather-day-weather">
        <weather-image
          :weather-id="forecast.weather"
          image-width="60px"
        />
      </div>
      <div class="course-weather-day-temperature">
        <temperature-component
          :value="forecast.high"
          font-size="12px"
          class="temperature-high"
        /> &nbsp;/
        <temperature-component
          :value="forecast.low"
          font-size="12px"
          class="temperature-low"
        />
      </div>
    </v-ons-col>
  </v-ons-row>
</template>

<script>
// components
import WeatherImage from '@/components/atoms/weather-image';
import TemperatureComponent from '@/components/atoms/temperature';

export default {
  name: 'CourseWeatherCalendar',
  components: {
    WeatherImage,
    TemperatureComponent,
  },
  props: {
    forecasts: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

@mixin colum-style {
  display: flex;
  align-items: center;
  justify-content: center;
}

.course-weather-calendar {
  margin-top: -5px;
}

.course-weather-day {
  margin-top: 20px;
  text-align: center;
  border-top: 1px solid $color-border;
  border-bottom: 1px solid $color-border;
  border-left: 1px solid $color-border;

  &:nth-child(4n),
  &:last-child {
    border-right: 1px solid $color-border;
  }
}

.course-weather-day-date {
  @include colum-style;

  height: 24px;
  font-size: $font-size-small;
  background: $color-th;
}

.course-weather-day-weather {
  @include colum-style;

  height: 50px;
}

.course-weather-day-temperature {
  @include colum-style;

  height: 30px;
  font-size: $font-size-small;
  white-space: nowrap;
}

.temperature-high {
  color: $color-temperature-high;
}

.temperature-low {
  color: $color-temperature-low;
}
</style>
