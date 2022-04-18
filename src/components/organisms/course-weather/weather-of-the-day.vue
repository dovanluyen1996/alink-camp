<template>
  <div class="course-weather-of-the-day">
    <div class="course-weather-of-the-day-title">
      予定日当日の天気
    </div>
    <v-ons-row>
      <v-ons-col width="50%">
        <weather-image
          :weather="forecast.targetDate"
          :is-shown-name="true"
          image-width="66px"
        />
      </v-ons-col>
      <v-ons-col width="50%">
        <course-weather-temperatures
          :forecast="forecast.targetDate"
          font-size="18px"
        />
      </v-ons-col>
    </v-ons-row>
    <v-ons-row>
      <v-ons-col>
        <course-weather-sun
          :sunrise="forecast.sunrise"
          :sunset="forecast.sunset"
        />
      </v-ons-col>
    </v-ons-row>
    <v-ons-row class="weather-indexes">
      <v-ons-col>
        <course-weather-thunder-index :forecast="forecast.targetDate" />
      </v-ons-col>
      <v-ons-col>
        <course-weather-dress-index :forecast="forecast.targetDate" />
      </v-ons-col>
      <v-ons-col>
        <course-weather-uv-index :forecast="forecast.targetDate" />
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
      required: true,
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
  font-weight: bold;
  line-height: 1;
  text-align: center;
  background: $color-th;
}

.weather-indexes {
  flex-wrap: nowrap;
  margin-top: 15px;
  color: #017f45;
}
</style>
