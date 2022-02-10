<template>
  <div class="campsite-weather-of-the-day">
    <div class="campsite-weather-of-the-day-title">
      {{ shortDate }}のお天気
    </div>
    <v-ons-row>
      <v-ons-col width="30%">
        <weather-image
          :weather="forecast.targetDate"
          :is-shown-name="true"
          image-width="66.5px"
        />
      </v-ons-col>
      <v-ons-col width="70%">
        <campsite-weather-temperatures
          :forecast="forecast.targetDate"
          font-size="20px"
        />
      </v-ons-col>
    </v-ons-row>
    <v-ons-row class="weather-indexes">
      <v-ons-col>
        <campsite-weather-sun
          :sunrise="forecast.sunrise"
          :sunset="forecast.sunset"
        />
      </v-ons-col>
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
import moment from 'moment';

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
  computed: {
    shortDate() {
      const targetDate = this.forecast.targetDate.date;
      return moment(targetDate).format('M/D');
    },
  },
};
</script>

<style scoped lang="scss">
.campsite-weather-of-the-day {
  text-align: center;
}

.campsite-weather-of-the-day-title {
  padding: 9px;
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
}

.weather-indexes {
  flex-wrap: nowrap;
  padding-top: 10px;
  margin-top: 15px;
  color: #017f45;
  border-top: 1px solid #d9d9d9;

  ons-col {
    padding: 0 2px;
  }
}

/deep/ {
  .weather-name {
    font-size: 9px;
    font-weight: 300;
  }

  .campsite-weather-sun__top {
    & > span {
      color: #007540;
    }
  }

  .thunder-title,
  .thunder-label,
  .dress-title,
  .uv-title,
  .uv-label,
  .star-title,
  .star-label {
    color: #007540;
  }

  .campsite-weather-temperatures {
    justify-content: center;
  }
}
</style>
