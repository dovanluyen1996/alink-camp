<template>
  <div class="ten-days-weather">
    <div class="card__title card__title--center">
      10日間の天気
    </div>

    <slot name="switcher" />

    <sticky-table class="ten-days-weather-table">
      <date-row :forecast-data="forecasts" />
      <weather-row :forecast-data="forecasts" />
      <prob-precip-row :forecast-data="forecasts" />
      <temperature-row
        :forecast-data="forecasts"
        :is-highest="true"
      />
      <temperature-row
        :forecast-data="forecasts"
        :is-lowest="true"
      />
      <wind-direction-row :forecast-data="forecasts" />
      <wind-speed-row :forecast-data="forecasts" />
    </sticky-table>
  </div>
</template>

<script>
// components
import StickyTable from '@/components/organisms/sticky-table';
import DateRow from '@/components/organisms/forecast-table/date-row';
import WeatherRow from '@/components/organisms/forecast-table/weather-row';
import ProbPrecipRow from '@/components/organisms/forecast-table/prob-precip-row';
import TemperatureRow from '@/components/organisms/forecast-table/temperature-row';
import WindDirectionRow from '@/components/organisms/forecast-table/wind-direction-row';
import WindSpeedRow from '@/components/organisms/forecast-table/wind-speed-row';

export default {
  name: 'CoursesForecastTabHourlyWeather',
  components: {
    StickyTable,
    DateRow,
    WeatherRow,
    ProbPrecipRow,
    TemperatureRow,
    WindDirectionRow,
    WindSpeedRow,
  },
  data() {
    return {
      // TODO: デミーデータです
      forecasts: [
        {
          date: '2021-6-23',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          date: '2021-6-23',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          date: '2021-6-23',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          date: '2021-6-23',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          date: '2021-6-23',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          date: '2021-6-23',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          date: '2021-6-23',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          date: '2021-6-23',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          date: '2021-6-23',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          date: '2021-6-23',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          date: '2021-6-23',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          date: '2021-6-23',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          date: '2021-6-23',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          date: '2021-6-23',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          date: '2021-6-23',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          date: '2021-6-23',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          date: '2021-6-23',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          date: '2021-6-23',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          date: '2021-6-23',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          date: '2021-6-23',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          date: '2021-6-23',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          date: '2021-6-23',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          date: '2021-6-23',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
        {
          date: '2021-6-23',
          weather: 1,
          prob_precip: 10,
          precipitation: 0,
          temperature: 20,
          wind_direction: '南',
          wind_speed: 3,
        },
      ],
    };
  },
  mounted() {
    this.tableScrollPlans();
  },
  methods: {
    tableScrollPlans() {
      // NOTE: セルのdate-day属性に時刻を入れてスクロール位置を取得している
      const table = this.$el.querySelector('.ten-days-weather-table');
      const dateRow = table.querySelector('.date-row');
      const th = dateRow.querySelector('th');
      // TODO: plansのフォーマットをAPIのデータに合わせてください
      const plans = '2021-6-23';
      const plansCol = dateRow.querySelector(`[date-day="${plans}"]`);
      const x = plansCol.offsetLeft - th.offsetWidth;

      table.scrollTo(x, 0);
    },
  },
};
</script>

<style scoped lang="scss">
/deep/ {
  .table {
    text-align: center;
  }

  .th {
    white-space: nowrap;
  }
}
</style>
