<template>
  <div class="hourly-weather">
    <div class="card__title card__title--center">
      1ヶ月先までの天気傾向
    </div>

    <temperature-chart />

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

.hourly-weather {
  padding: 30px;
  margin: 40px 30px 30px;
  background: #fff;
  border-radius: 10px;
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
  font-weight: bold;
}

.chart-update {
  align-self: flex-end;
  padding-right: 7px;
  padding-bottom: 5px;
  font-size: $font-size-small;
  text-align: right;
}
</style>
