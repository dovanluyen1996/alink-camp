<template>
  <sticky-table class="score-course-weather">
    <template #thead>
      <date-row :forecast-data="weathers" />
    </template>
    <weather-row :weathers="weathers" />
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
import DateRow from '@/components/organisms/weather-table/date-row';

export default {
  name: 'UserCourseReslutsCourseWeather',
  components: {
    StickyTable,
    WeatherRow,
    TemperatureRow,
    DateRow,
  },
  props: {
    weathers: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.score-course-weather {
  width: fit-content;
  max-width: 100%;
  margin: 15px 0 20px;
  font-size: $font-size-small;
  text-align: center;

  /deep/ {
    table {
      width: auto;
      table-layout: fixed;
    }

    tr {
      td {
        width: 30px;
      }
    }

    tbody {
      th {
        width: 30px;
        min-width: 30px;
      }

      td:nth-child(1) {
        background: $color-th;
      }
    }
  }
}
</style>
