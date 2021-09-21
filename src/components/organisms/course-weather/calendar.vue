<template>
  <v-ons-row class="course-weather-calendar">
    <v-ons-col
      v-for="(forecast, index) in forecasts"
      :key="index"
      width="25%"
      class="course-weather-day"
    >
      <div
        class="course-weather-day-date"
        :class="[saturdayCol(forecast.date), sundayCol(forecast.date)]"
      >
        {{ forecast.date ? shortDate(forecast.date) : '--/--' }}
      </div>
      <div class="course-weather-day-weather">
        <weather-image
          :weather="forecast"
          image-width="60px"
        />
      </div>
      <div class="course-weather-day-temperature">
        <temperature-component
          :value="forecast.maxTemp"
          font-size="12px"
          class="temperature-high"
        />&nbsp;/&nbsp;
        <temperature-component
          :value="forecast.minTemp"
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
      required: true,
    },
  },
  methods: {
    shortDate(date) {
      return this.$helpers.toShortString(date);
    },
    saturdayCol(date) {
      return this.$helpers.isSaturday(date) ? 'date-row__sarturday' : '';
    },
    sundayCol(date) {
      return this.$helpers.isSunday(date) ? 'date-row__sunday' : '';
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
  margin-top: -10px;
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

.course-weather-day-weather {
  @include colum-style;

  height: 50px;
  border-top: 1px solid $color-border;
  border-bottom: 1px solid $color-border;
}

.course-weather-day-temperature {
  @include colum-style;

  height: 30px;
  font-size: $font-size-small;
  white-space: nowrap;

  /deep/ {
    .temperature__unit {
      margin-left: 0;
    }
  }
}

.temperature-high {
  color: $color-temperature-high;
}

.temperature-low {
  color: $color-temperature-low;
}

.date-row {
  &__sarturday {
    color: #113095;
    background-color: #e3f6ff;
  }

  &__sunday {
    color: #9d1d1d;
    background-color: #ffeaea;
  }
}
</style>
