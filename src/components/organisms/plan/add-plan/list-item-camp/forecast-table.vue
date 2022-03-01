<template>
  <div class="table-weather">
    <table class="table">
      <tbody>
        <tr>
          <th>日程</th>
          <th>天気</th>
          <th>
            降水量
            <br>
            <span class="text-small">(mm/h)</span>
          </th>
          <th>気温</th>
          <th>
            風
            <br>
            <span class="text-small">(m/s)</span>
          </th>
        </tr>
        <tr
          v-for="(item, index) in items"
          :key="index"
        >
          <td class="date-check">
            <span
              :date-day="item.date"
              :class="[saturdayCol(item.date), sundayCol(item.date)]"
              v-html="displayDate(item.date)"
            />
          </td>
          <td>
            <weather-image
              :weather="item"
              image-width="35px"
            />
          </td>
          <td>{{ precipitationText(item.precip) }}</td>
          <td>
            <temperature
              :value="item.maxTemp"
              class="text-red"
            />
            &nbsp;/&nbsp;
            <temperature
              :value="item.minTemp"
              class="text-blue"
            />
          </td>
          <td>
            <div class="wind-direction">
              <div :class="['wind-speed', windSpeedRate(item.windSpeed)]" />
              <span>{{ item.windSpeed }}</span>
            </div>
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
  name: 'ForecastTableDate',
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
  data() {
    return {
      dateRange: [],
    };
  },
  computed: {
    params() {
      return this.$store.getters['plan/params'];
    },
    startedDate() {
      return this.params.startedDate;
    },
    finishedDate() {
      return this.params.finishedDate;
    },
    items() {
      if(!this.dateRange.length || !this.forecasts['items']) return [];

      const items = this.forecasts['items'];
      return items.filter((item) => this.dateRange.includes(item.date));
    }
  },
  watch: {
    async startedDate() {
      this.dateRange = await this.getDateRange();
    },
    async finishedDate() {
      this.dateRange = await this.getDateRange();
    },
  },
  methods: {
    getDateRange() {
      if(this.startedDate && this.finishedDate) {
        return this.$helpers.getDateRange(this.startedDate, this.finishedDate);
      }
      if(this.startedDate) return [this.startedDate];
      if(this.finishedDate) return [this.finishedDate];

      return [];
    },
    displayDate(date) {
      return this.$helpers.toShortStringWithZero(date);
    },
    saturdayCol(date) {
      return this.$helpers.isSaturday(date) ? 'date-col__sarturday' : '';
    },
    sundayCol(date) {
      return this.$helpers.isSunday(date) ? 'date-col__sunday' : '';
    },
    precipitationText(precipitation) {
      return this.$helpers.isEmpty(precipitation) ? '--' : precipitation;
    },
    windSpeedRate(windSpeed) {
      // Unit of measurement: m/s
      switch (true) {
      case (windSpeed < 2):
        return 'wind-speed--normal';
      case (windSpeed < 5):
        return 'wind-speed--strong';
      default:
        return 'wind-speed--danger';
      }
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

      &--normal {
        background-image: url('~@/assets/images/weathers/wind-speed/background-normal.png');
      }

      &--strong {
        background-image: url('~@/assets/images/weathers/wind-speed/background-strong.png');
      }

      &--danger {
        background-image: url('~@/assets/images/weathers/wind-speed/background-danger.png');
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
