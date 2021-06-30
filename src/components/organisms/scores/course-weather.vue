<template>
  <sticky-table class="score-course-weather">
    <template #thead>
      <tr>
        <th class="th" />
        <th
          v-for="(weather, index) in weathers"
          :key="index"
          scope="col"
          class="th"
        >
          {{ weather.date }}
        </th>
      </tr>
    </template>
    <weather-row :forecast-data="weathers" />
    <temperature-row
      :forecast-data="weathers"
      :is-highest="true"
    />
    <temperature-row
      :forecast-data="weathers"
      :is-lowest="true"
    />
  </sticky-table>
</template>

<script>
// components
import StickyTable from '@/components/organisms/sticky-table';
import WeatherRow from '@/components/organisms/weather-table/weather-row';
import TemperatureRow from '@/components/organisms/weather-table/temperature-row';

export default {
  name: 'ScoresCourseWeather',
  components: {
    StickyTable,
    WeatherRow,
    TemperatureRow,
  },
  data() {
    return {
      weathers: [
        {
          date: '6/30',
          weather: 1,
          temperature: 20,
        },
        {
          date: '6/30',
          weather: 1,
          temperature: 20,
        },
        {
          date: '6/30',
          weather: 1,
          temperature: 20,
        },
        {
          date: '6/30',
          weather: 1,
          temperature: 20,
        },
        {
          date: '6/30',
          weather: 1,
          temperature: 20,
        },
        {
          date: '6/30',
          weather: 1,
          temperature: 20,
        },
        {
          date: '6/30',
          weather: 1,
          temperature: 20,
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.score-course-weather {
  margin: 15px 0 20px;
  font-size: $font-size-small;
  text-align: center;

  /deep/ tbody th {
    width: 50px;
    min-width: 50px;
    background: #fff;
  }
}
</style>
