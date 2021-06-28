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
        :forecast-data="forecasts"
        :color-th="false"
      />
      <wind-direction-row
        :forecast-data="forecasts"
        :color-th="false"
      />
      <wind-speed-row
        :forecast-data="forecasts"
        :color-th="false"
      />
    </tbody>
  </table>
</template>

<script>
// components
import ProbPrecipRow from '@/components/organisms/forecast-table/prob-precip-row';
import WindDirectionRow from '@/components/organisms/forecast-table/wind-direction-row';
import WindSpeedRow from '@/components/organisms/forecast-table/wind-speed-row';

export default {
  name: 'CourseWeatherHourlyWeather',
  components: {
    ProbPrecipRow,
    WindDirectionRow,
    WindSpeedRow,
  },
  data() {
    return {
      forecasts: [
        {
          prob_precip: 10,
          wind_direction: '南',
          wind_speed: 2,
        },
        {
          prob_precip: 20,
          wind_direction: '南東',
          wind_speed: 3,
        },
        {
          prob_precip: 30,
          wind_direction: '南',
          wind_speed: 4,
        },
        {
          prob_precip: 40,
          wind_direction: '南西',
          wind_speed: 5,
        },
      ],
    };
  },
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
