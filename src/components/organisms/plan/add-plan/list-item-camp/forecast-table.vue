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
        <tr v-for="(item, index) in items"
            :key=index
        >
          <td class="date-check">
            <span
              :date-day="item.date"
              :class="[saturdayCol(item.date), sundayCol(item.date)]"
              v-html="displayDate(item.date)"
            />
          </td>
          <td>
            <img
              :src="require('@/assets/images/weathers/weather/02.png')"
              class="icon-weather"
            >
          </td>
          <td>{{ item.precipitation }}</td>
          <td>
            <span class="text-red">32°C </span>
            &nbsp;/&nbsp;
            <span class="text-blue">12°C</span>
          </td>
          <td>
            <div class="wind-direction">
              <!-- // TODO: change class when do logic -->
              <div class="wind-speed wind-speed--danger" />
              <span>{{ item.wind }}</span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'ForecastTableDate',
  data() {
    return {
      items: [
        {
          date: '12/31/2021',
          precipitation: '0',
          wind: '99',
        },
        {
          date: '01/01/2022',
          precipitation: '0',
          wind: '99',
        },
        {
          date: '01/02/2022',
          precipitation: '0',
          wind: '99',
        },
      ],
    };
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
    }

    .text-small {
      display: block;
      font-size: 8px;
    }

    tr {
      border: 1px solid $color-border;
    }

    td {
      height: 34px;
      font-size: 14px;
      font-weight: 300;
    }

    th,
    td {
      padding: 0;
      border-right: 1px solid $color-border !important;
    }

    .date-check {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        padding: 0 12px;
      }
    }

    .icon-weather {
      width: 35px;
      height: 21px;
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

      .wind-speed {
        width: 10px;
        height: 16px;
      }

      span {
        font-size: 10px;
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
