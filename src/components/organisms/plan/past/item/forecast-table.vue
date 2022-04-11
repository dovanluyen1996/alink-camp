<template>
  <div class="table-weather">
    <div class="date-detail">
      <span>天気予報</span>
      <slot name="shareButton" />
    </div>

    <table class="table">
      <tbody>
        <tr>
          <th>日程</th>
          <th>天気</th>
          <th>気温</th>
        </tr>
        <tr
          v-for="(date, index) in dateRange"
          :key="index"
        >
          <td class="date-check">
            <span
              :date-day="date"
              :class="[saturdayCol(date), sundayCol(date)]"
              v-html="displayDate(date)"
            />
          </td>
          <td>
            <weather-image
              :weather="items[date]"
              image-width="35px"
            />
          </td>
          <td>
            <temperature
              :value="items[date] ? items[date].maxTemp : ''"
              class="text-red"
            />
            &nbsp;/&nbsp;
            <temperature
              :value="items[date] ? items[date].minTemp : ''"
              class="text-blue"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import WeatherImage from '@/components/atoms/weather-image';
import Temperature from '@/components/atoms/temperature';

export default {
  name: 'ForecastTable',
  components: {
    WeatherImage,
    Temperature,
  },
  props: {
    campsite: {
      type: Object,
      required: true,
    },
    forecasts: {
      type: Object,
      required: true,
    },
  },
  computed: {
    dateRange() {
      return this.$store.getters['plan/dateRange'];
    },
    items() {
      if (!this.dateRange.length || !this.forecasts.items) return [];

      const { items } = this.forecasts;
      return items.reduce((acc, cur) => { acc[cur.date] = cur; return acc; }, {});
    },
  },
  methods: {
    displayDate(date) {
      return this.$helpers.toShortStringWithZero(date);
    },
    saturdayCol(date) {
      return this.$helpers.isSaturday(date) ? 'date-col__sarturday' : '';
    },
    sundayCol(date) {
      return this.$helpers.isSunday(date) ? 'date-col__sunday' : '';
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

/deep/ {
  table td,
  table th {
    border: none;
  }
}

.table-weather {
  margin: 20px 10px;
  overflow: auto;

  .date-detail {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 43px;
    font-size: $font-size-large;
    font-weight: bold;
    background-color: #eae5e5;
  }

  .table {
    width: 100%;
    text-align: center;
    background-color: #fff;

    tr {
      border: 1px solid $color-border;
    }

    th,
    td {
      font-size: $font-size-small;
    }

    th {
      background-color: #eae5e5;
      border-right: 1px solid $color-border;
    }

    td {
      height: 34px;
      font-size: 14px;
      font-weight: 300;
      border-left: 1px solid $color-border;
    }

    .text-small {
      display: block;
      font-size: 12px;
    }

    .date-check {
      span {
        padding: 0 12px;
      }
    }

    .text-red {
      color: #f53939;
    }

    .text-blue {
      color: #0097ff;
    }
  }
}

.date-col {
  &__sarturday {
    color: #0097ff;
  }

  &__sunday {
    color: #f53939;
  }
}
</style>
