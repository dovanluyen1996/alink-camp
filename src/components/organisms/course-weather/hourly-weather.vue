<template>
  <table class="course-weather-time-table">
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
      />
    </tbody>
  </table>
</template>

<script>
// components
import ProbPrecipRow from '@/components/organisms/weather-table/prob-precip-row';
import WindDirectionRow from '@/components/organisms/weather-table/wind-direction-row';
import WindSpeedRow from '@/components/organisms/weather-table/wind-speed-row';

export default {
  name: 'CourseWeatherHourlyWeather',
  components: {
    ProbPrecipRow,
    WindDirectionRow,
    WindSpeedRow,
  },
  props: {
    forecast: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  computed: {
    probPrecips() {
      const precips = [];

      precips.push(this.forecast.precip_0);
      precips.push(this.forecast.precip_6);
      precips.push(this.forecast.precip_12);
      precips.push(this.forecast.precip_18);

      return precips;
    },
    windDirections() {
      const drectoins = [];

      drectoins.push(this.forecast.wind_direction_0);
      drectoins.push(this.forecast.wind_direction_6);
      drectoins.push(this.forecast.wind_direction_12);
      drectoins.push(this.forecast.wind_direction_18);

      return drectoins;
    },
    windSpeeds() {
      const speeds = [];

      speeds.push(this.forecast.wind_speed_0);
      speeds.push(this.forecast.wind_speed_6);
      speeds.push(this.forecast.wind_speed_12);
      speeds.push(this.forecast.wind_speed_18);

      return speeds;
    },
  }
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.course-weather-time-table {
  width: 100%;
  font-size: $font-size-small;
  text-align: center;
}
</style>
