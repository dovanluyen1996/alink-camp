<template>
  <div class="campsite-weather-of-the-day">
    <div class="campsite-weather-of-the-day-title">
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
        <campsite-weather-temperatures
          :forecast="forecast.targetDate"
          font-size="18px"
        />
      </v-ons-col>
    </v-ons-row>
    <v-ons-row>
      <v-ons-col>
        <campsite-weather-sun
          :sunrise="forecast.sunrise"
          :sunset="forecast.sunset"
        />
      </v-ons-col>
    </v-ons-row>
    <v-ons-row class="weather-indexes">
      <v-ons-col>
        <campsite-weather-thunder-index :forecast="forecast.targetDate" />
      </v-ons-col>
      <v-ons-col>
        <campsite-weather-dress-index :forecast="forecast.targetDate" />
      </v-ons-col>
      <v-ons-col>
        <campsite-weather-uv-index :forecast="forecast.targetDate" />
      </v-ons-col>
      <v-ons-col>
        <campsite-weather-star-index :forecast="forecast.targetDate" />
      </v-ons-col>
    </v-ons-row>
  </div>
</template>

<script>
// components
import WeatherImage from '@/components/atoms/weather-image';
import CampsiteWeatherTemperatures from '@/components/organisms/campsite-weather/temperatures';
import CampsiteWeatherSun from '@/components/organisms/campsite-weather/sun';
import CampsiteWeatherThunderIndex from '@/components/organisms/campsite-weather/indexes/thunder';
import CampsiteWeatherDressIndex from '@/components/organisms/campsite-weather/indexes/dress';
import CampsiteWeatherUvIndex from '@/components/organisms/campsite-weather/indexes/uv';
import CampsiteWeatherStarIndex from '@/components/organisms/campsite-weather/indexes/star';

export default {
  name: 'CampsiteWeatherOfTheDay',
  components: {
    WeatherImage,
    CampsiteWeatherTemperatures,
    CampsiteWeatherSun,
    CampsiteWeatherThunderIndex,
    CampsiteWeatherDressIndex,
    CampsiteWeatherUvIndex,
    CampsiteWeatherStarIndex,
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

.campsite-weather-of-the-day {
  margin-bottom: 10px;
  text-align: center;
}

.campsite-weather-of-the-day-title {
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
