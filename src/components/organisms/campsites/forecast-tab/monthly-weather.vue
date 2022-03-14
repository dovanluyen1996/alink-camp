<template>
  <div>
    <div class="hourly-weather-title">
      未来の天気傾向
    </div>
    <div v-if="isPurchased">
      <div class="hourly-weather">
        <temperature-chart />
      </div>

      <div class="hourly-weather">
        <temperature-table />
      </div>

      <div class="hourly-weather">
        <prob-precip-chart />
      </div>

      <div class="hourly-weather">
        <annual-weather-chart />
      </div>
    </div>

    <div
      v-else
      class="not-purchase"
    >
      <!-- TODO: Delete .not-purchase if it is not needed -->

      <img src="@/assets/images/weather-not-purchase.png">
    </div>
  </div>
</template>

<script>
// components
import TemperatureChart from '@/components/organisms/campsites/forecast-tab/temperature-chart';
import TemperatureTable from '@/components/organisms/campsites/forecast-tab/temperature-table';
import ProbPrecipChart from '@/components/organisms/campsites/forecast-tab/prob-precip-chart';
import AnnualWeatherChart from '@/components/organisms/campsites/forecast-tab/annual-weather-chart';

export default {
  name: 'CampsitesForecastTabMonthlyWeather',
  components: {
    TemperatureChart,
    TemperatureTable,
    ProbPrecipChart,
    AnnualWeatherChart,
  },
  data() {
    return {
      isPurchased: false,
    };
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

.hourly-weather-title {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  font-size: 16px;
  font-weight: 600;
  color: $color-white;
  background-color: #f29678;
}

.hourly-weather {
  padding: 10px;
  margin: 10px 10px 15px;
  background: $color-white;
  border-radius: 10px;
}

.not-purchase {
  padding: 30px 10px;

  img {
    width: 100%;
  }
}

.chart-header {
  height: 40px;
  margin: 15px 0;
  background: $color-th;
  border: 1px solid $color-border;
}

.chart-title {
  align-self: center;
  padding-left: 10px;
  font-weight: 600;
}

.chart-update {
  align-self: flex-end;
  padding-right: 7px;
  padding-bottom: 5px;
  font-size: $font-size-small;
  text-align: right;
}
</style>
