<template>
  <table class="campsite-weather-time-table">
    <thead>
      <tr>
        <th
          scope="col"
          class="th"
        >
          時間
        </th>
        <th
          scope="col"
          class="th"
        >
          00 - 06
        </th>
        <th
          scope="col"
          class="th"
        >
          06 - 12
        </th>
        <th
          scope="col"
          class="th"
        >
          12 - 18
        </th>
        <th
          scope="col"
          class="th"
        >
          18 - 24
        </th>
      </tr>
    </thead>
    <tbody>
      <prob-precip-row
        :prob-precips="probPrecips"
        :color-th="false"
      />
      <wind-direction-row
        :wind-directions="windDirections"
        :color-th="false"
      />
      <wind-speed-row
        :wind-speeds="windSpeeds"
        :color-th="false"
        :display-campsite-weather-top="true"
      />
      <humidity-row
        :humidity="humidity"
        :color-th="false"
      />
    </tbody>
  </table>
</template>

<script>
// components
import ProbPrecipRow from '@/components/organisms/weather-table/prob-precip-row';
import WindDirectionRow from '@/components/organisms/weather-table/wind-direction-row';
import WindSpeedRow from '@/components/organisms/weather-table/wind-speed-row';
import HumidityRow from '@/components/organisms/weather-table/humidity-row';

export default {
  name: 'CampsiteWeatherHourlyWeather',
  components: {
    ProbPrecipRow,
    WindDirectionRow,
    WindSpeedRow,
    HumidityRow,
  },
  props: {
    forecast: {
      type: Object,
      required: true,
    },
  },
  computed: {
    probPrecips() {
      if (!this.forecast) return [null, null, null, null];

      const precips = [];

      precips.push(this.forecast.precip_0);
      precips.push(this.forecast.precip_6);
      precips.push(this.forecast.precip_12);
      precips.push(this.forecast.precip_18);

      return precips;
    },
    windDirections() {
      if (!this.forecast) return [null, null, null, null];

      const drectoins = [];

      drectoins.push(this.forecast.windDirection_0);
      drectoins.push(this.forecast.windDirection_6);
      drectoins.push(this.forecast.windDirection_12);
      drectoins.push(this.forecast.windDirection_18);

      return drectoins;
    },
    windSpeeds() {
      if (!this.forecast) return [null, null, null, null];

      const speeds = [];

      speeds.push(this.forecast.windSpeed_0);
      speeds.push(this.forecast.windSpeed_6);
      speeds.push(this.forecast.windSpeed_12);
      speeds.push(this.forecast.windSpeed_18);

      return speeds;
    },
    humidity() {
      if (!this.forecast) return [null, null, null, null];

      const humidity = [];

      humidity.push(this.forecast.humidity_0);
      humidity.push(this.forecast.humidity_6);
      humidity.push(this.forecast.humidity_12);
      humidity.push(this.forecast.humidity_18);

      return humidity;
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.campsite-weather-time-table {
  width: 100%;
  font-size: $font-size-small;
  text-align: center;
}
</style>
