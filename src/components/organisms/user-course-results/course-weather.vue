<template>
  <sticky-table class="score-course-weather">
    <template #thead>
      <tr>
        <th class="th">
          日
        </th>
        <th
          v-for="(weather, index) in weathers"
          :key="index"
          scope="col"
          class="th"
          :class="[saturdayCol(weather.date), sundayCol(weather.date)]"
        >
          <span
            v-if="weather"
          >
            {{ displayDate(weather.date) }}
          </span>
        </th>
      </tr>
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

export default {
  name: 'UserCourseReslutsCourseWeather',
  components: {
    StickyTable,
    WeatherRow,
    TemperatureRow,
  },
  props: {
    weathers: {
      type: Array,
      required: true,
    },
  },
  methods: {
    displayDate(date) {
      return this.$helpers.toWeekDayString(date);
    },
    saturdayCol(date) {
      return this.$helpers.isSaturday(date) ? 'date-row__sarturday' : '';
    },
    sundayCol(date) {
      return this.$helpers.isSunday(date) ? 'date-row__sunday' : '';
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

    tbody {
      th {
        width: 50px;
        min-width: 50px;
      }

      th:nth-child(1) {
        width: 30px;
        min-width: 30px;
      }

      td:nth-child(1) {
        background: $color-th;
      }
    }
  }
}

.th {
  background: #fff;
}

.th:nth-child(1) {
  background: $color-th;
}

.date-row {
  &__sarturday {
    color: #113095;
    background-color: #e3f6ff;
  }

  &__sunday {
    color: #9d1d1d;
    background-color: #ffeaea;
  }
}
</style>
