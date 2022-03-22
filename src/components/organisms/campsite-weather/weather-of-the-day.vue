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
        <campsite-weather-temperatures
          :forecast="forecast.targetDate"
          font-size="16px"
        />
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
        プレミアムプランでご利用可能
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

.campsite-weather-of-the-day-title {
  margin-bottom: 10px;
  font-size: $font-size-small;
  font-weight: 600;
  line-height: 1;
  text-align: center;
}

.weather-indexes {
  position: relative;
  flex-wrap: nowrap;
  padding: 5px 10px 5px 0;
  color: #017f45;
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
  top: 33px;
  right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 88vw;
  height: 13px;
  font-size: 7px;
  font-weight: 600;
  color: #f5f2f2;
  background-color: $color-yellow;
  border-radius: 22px;
}

.campsite-weather-of-the-day-right {
  display: flex;
  flex-direction: column;
  margin-top: 9px;
}

/deep/ {
  .weather-name {
    font-size: $font-size-small;
    font-weight: 300;
  }

  .campsite-weather-sun,
  .thunder-title,
  .thunder-label,
  .dress-title,
  .dress-label,
  .uv-title,
  .uv-label,
  .star-title,
  .star-label {
    font-size: 10px;
    color: #007540;
  }

  .campsite-weather-sun,
  .thunder-title,
  .dress-title,
  .uv-title,
  .star-title {
    font-weight: 600;
  }

  .thunder-label,
  .dress-label,
  .uv-label,
  .star-label {
    font-weight: 300;
  }

  .thunder-title--unpaid,
  .dress-title--unpaid,
  .uv-title--unpaid,
  .star-title--unpaid {
    padding-bottom: 7px;
    color: #ccc;
  }

  .campsite-weather-temperatures {
    justify-content: center;
  }

  .temperature__value {
    font-size: 20px;
    font-weight: 600;
  }

  .temperature-high {
    margin-right: 5px;
  }

  .thunder,
  .dress,
  .uv,
  .star {
    height: 100%;

    & > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }
}

@media only screen and (max-width: 375px) {
  .campsite-weather-of-the-day-box {
    padding-left: 10px;
  }
}
</style>
