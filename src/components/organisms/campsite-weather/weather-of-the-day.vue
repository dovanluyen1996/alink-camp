<template>
  <div class="campsite-weather-of-the-day">
    <v-ons-row class="campsite-weather-of-the-day-top">
      <v-ons-col
        class="campsite-weather-of-the-day-box"
        width="35%"
      >
        <div class="campsite-weather-of-the-day-title">
          {{ shortDate }}のお天気
        </div>
        <weather-image
          :weather="forecast.targetDate"
          :is-shown-name="true"
          image-width="66px"
        />
      </v-ons-col>
      <v-ons-col
        class="campsite-weather-of-the-day-right"
        width="65%"
      >
        <campsite-weather-temperatures :forecast="forecast.targetDate" />
        <campsite-weather-sun
          :sunrise="forecast.sunrise"
          :sunset="forecast.sunset"
        />
      </v-ons-col>
    </v-ons-row>
    <v-ons-row class="weather-indexes">
      <div
        v-if="!isPurchased"
        class="campsite-weather-of-the-day-purchase"
      >
        キャンプ天気会員でご利用可能
      </div>
      <v-ons-col width="25%">
        <campsite-weather-thunder-index
          :forecast="forecast.targetDate"
          :is-purchased="isPurchased"
        />
      </v-ons-col>
      <v-ons-col width="25%">
        <campsite-weather-dress-index
          :forecast="forecast.targetDate"
          :is-purchased="isPurchased"
        />
      </v-ons-col>
      <v-ons-col width="25%">
        <campsite-weather-uv-index
          :forecast="forecast.targetDate"
          :is-purchased="isPurchased"
        />
      </v-ons-col>
      <v-ons-col width="25%">
        <campsite-weather-star-index
          :forecast="forecast.targetDate"
          :is-purchased="isPurchased"
        />
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
    isPurchased() {
      return this.$store.getters['purchase/isPurchased'];
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.campsite-weather-of-the-day {
  text-align: center;
}

.campsite-weather-of-the-day-top {
  padding: 10px 0 6px;
}

.campsite-weather-of-the-day-title {
  font-size: $font-size-small;
  font-weight: bold;
  line-height: 1;
  text-align: center;
}

.weather {
  margin: 10px 0 7px;
}

.weather-indexes {
  position: relative;
  padding: 10px 0;
  border-top: 1px solid #d9d9d9;
}

.campsite-weather-of-the-day-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.campsite-weather-of-the-day-purchase {
  position: absolute;
  right: 15px;
  bottom: 22px;
  left: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 21px;
  font-size: 10px;
  font-weight: bold;
  color: #f5f2f2;
  background-color: $color-yellow;
  border-radius: 22px;
}

.campsite-weather-of-the-day-right {
  display: flex;
  flex-direction: column;
}

/deep/ {
  .weather-name {
    font-size: $font-size-small;
  }

  .campsite-weather-temperatures {
    justify-content: center;
  }

  .temperature__value {
    font-size: 20px;
    font-weight: bold;
  }

  .temperature-high {
    margin-right: 5px;
  }
}

@media only screen and (max-width: 375px) {
  .campsite-weather-of-the-day-box {
    padding-left: 10px;
  }
}
</style>
