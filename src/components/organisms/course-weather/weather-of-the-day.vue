<template>
  <div class="course-weather-of-the-day">
    <div class="course-weather-of-the-day-title">
      予定日当日のお天気
    </div>
    <v-ons-row>
      <v-ons-col>
        <weather-image
          :weather="forecast.scheduled_date"
          :is-shown-name="true"
          image-width="66px"
        />
      </v-ons-col>
      <v-ons-col>
        <course-weather-temperatures
          :forecast="forecast.scheduled_date"
          font-size="18px"
        />
        <course-weather-sun
          :sunrise="forecast.sunrise"
          :sunset="forecast.sunset"
        />
      </v-ons-col>
    </v-ons-row>
    <v-ons-row class="weather-indexes">
      <v-ons-col>
        <course-weather-thunder-index :forecast="forecast.scheduled_date" />
      </v-ons-col>
      <v-ons-col>
        <course-weather-dress-index :forecast="forecast.scheduled_date" />
      </v-ons-col>
      <v-ons-col>
        <course-weather-uv-index :forecast="forecast.scheduled_date" />
      </v-ons-col>
    </v-ons-row>
  </div>
</template>

<script>
// components
import WeatherImage from '@/components/atoms/weather-image';
import CourseWeatherTemperatures from '@/components/organisms/course-weather/temperatures';
import CourseWeatherSun from '@/components/organisms/course-weather/sun';
import CourseWeatherThunderIndex from '@/components/organisms/course-weather/indexes/thunder';
import CourseWeatherDressIndex from '@/components/organisms/course-weather/indexes/dress';
import CourseWeatherUvIndex from '@/components/organisms/course-weather/indexes/uv';

export default {
  name: 'CourseWeatherOfTheDay',
  components: {
    WeatherImage,
    CourseWeatherTemperatures,
    CourseWeatherSun,
    CourseWeatherThunderIndex,
    CourseWeatherDressIndex,
    CourseWeatherUvIndex,
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
  margin-bottom: 10px;
  text-align: center;
}

.course-weather-of-the-day-title {
  padding: 9px;
  margin-bottom: 10px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  background: $color-th;
}

.weather-indexes {
  flex-wrap: nowrap;
  margin-top: 15px;
  color: #017f45;

  ons-col {
    padding: 0 2px;
  }
}
</style>
