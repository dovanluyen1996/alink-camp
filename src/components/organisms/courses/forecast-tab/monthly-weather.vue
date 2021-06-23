<template>
  <div class="hourly-weather">
    <div class="card__title card__title--center">
      向こう一か月のお天気予測
    </div>

    <v-ons-row class="chart-header">
      <v-ons-col class="chart-title">
        気温（℃）
      </v-ons-col>
      <v-ons-col class="chart-update">
        12月27日23:59発表
      </v-ons-col>
    </v-ons-row>
    <temperature-chart />

    <v-ons-row class="chart-header">
      <v-ons-col class="chart-title">
        降水量（mm）
      </v-ons-col>
      <v-ons-col class="chart-update">
        12月27日23:59発表
      </v-ons-col>
    </v-ons-row>
    <prob-precip-chart />
  </div>
</template>

<script>
// components
import TemperatureChart from '@/components/organisms/courses/forecast-tab/temperature-chart';
import ProbPrecipChart from '@/components/organisms/courses/forecast-tab/prob-precip-chart';

export default {
  name: 'CoursesForecastTabMonthlyWeather',
  components: {
    TemperatureChart,
    ProbPrecipChart,
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

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
