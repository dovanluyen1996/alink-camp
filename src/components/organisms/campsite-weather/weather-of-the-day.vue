<template>
  <div class="campsite-weather-of-the-day">
    <v-ons-row>
      <v-ons-col
        class="campsite-weather-of-the-day-box"
        width="30%"
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
      <v-ons-col width="70%">
        <campsite-weather-temperatures
          :forecast="forecast.targetDate"
          font-size="16px"
        />
      </v-ons-col>
    </v-ons-row>
    <v-ons-row class="weather-indexes">
      <v-ons-col width="36%">
        <campsite-weather-sun
          :sunrise="forecast.sunrise"
          :sunset="forecast.sunset"
        />
      </v-ons-col>
      <div
        v-if="!isPurchased"
        class="campsite-weather-of-the-day-purchase"
      >
        プレミアムプランでご利用可能
      </div>
      <v-ons-col width="16%">
        <campsite-weather-thunder-index
          :forecast="forecast.targetDate"
          :is-purchased="isPurchased"
        />
      </v-ons-col>
      <v-ons-col width="16%">
        <campsite-weather-dress-index
          :forecast="forecast.targetDate"
          :is-purchased="isPurchased"
        />
      </v-ons-col>
      <v-ons-col width="16%">
        <campsite-weather-uv-index
          :forecast="forecast.targetDate"
          :is-purchased="isPurchased"
        />
      </v-ons-col>
      <v-ons-col width="16%">
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
  data() {
    return {
      isPurchased: true,
    };
  },
  computed: {
    shortDate() {
      const targetDate = this.forecast.targetDate.date;
      return moment(targetDate).format('M/D');
    },
  },
  async created() {
    await this.setIsPurchased();
  },
  methods: {
    async setIsPurchased() {
      this.isPurchased = await this.$store.dispatch('purchase/getIsPurchased');
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
  padding-top: 5px;
  font-size: $font-size-small;
  font-weight: 600;
  line-height: 1;
  text-align: center;
}

.weather-indexes {
  position: relative;
  flex-wrap: nowrap;
  padding: 5px 0;
  margin-top: 15px;
  color: #017f45;
  border-top: 1px solid #d9d9d9;
}

.campsite-weather-of-the-day-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 30px;
}

.campsite-weather-of-the-day-purchase {
  position: absolute;
  top: 27px;
  right: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;
  height: 13px;
  font-size: 7px;
  font-weight: 600;
  color: #f5f2f2;
  background-color: $color-yellow;
  border-radius: 22px;
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
    font-weight: 600;
    color: #007540;
  }

  .thunder-title--unpaid,
  .dress-title--unpaid,
  .uv-title--unpaid,
  .star-title--unpaid {
    color: #ccc;
  }

  .campsite-weather-temperatures {
    justify-content: center;
  }

  .temperature__value {
    font-size: 20px;
    font-weight: 600;
  }
}

@media only screen and (max-width: 375px) {
  .campsite-weather-of-the-day-box {
    padding-left: 10px;
  }
}
</style>
