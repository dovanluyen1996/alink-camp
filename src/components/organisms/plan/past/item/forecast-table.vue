<template>
  <div class="table-weather">
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

$speed-degrees: 0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180,
  202.5, 225, 247.5, 270, 292.5, 315, 337.5;

/deep/ {
  table td,
  table th {
    border: none;
  }
}

.table-weather {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  overflow: auto;

  .table {
    width: 100%;
    text-align: center;
    background-color: #fff;

    th {
      height: 31px;
      font-size: 12px;
      font-weight: 600;
      color: #100101;
      background-color: #eae5e5;
      border-right: 1px solid $color-border !important;
    }

    .text-small {
      display: block;
      font-size: 12px;
    }

    tr {
      border: 1px solid $color-border;
    }

    td {
      height: 34px;
      font-size: 14px;
      font-weight: 300;
      border-left: 1px solid $color-border !important;
    }

    th,
    td {
      padding: 0;
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

    .wind-speed {
      background-position: center;
      background-size: cover;

      &--light {
        background-image: url('~@/assets/images/weathers/wind-speed/background-light.png');
      }

      &--middle {
        background-image: url('~@/assets/images/weathers/wind-speed/background-middle.png');
      }

      &--strong {
        background-image: url('~@/assets/images/weathers/wind-speed/background-strong.png');
      }
    }

    .wind-direction {
      display: grid;
      align-items: center;
      justify-content: center;

      @each $degree in $speed-degrees {
        // generate class has partern: wind-direction--xx-deg
        &--#{floor($degree)}-deg {
          transform: rotate(#{$degree}deg);
        }
      }

      .wind-speed {
        width: 10px;
        height: 16px;
      }

      span {
        font-size: 12px;
      }
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
