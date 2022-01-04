<template>
  <div class="table-weather">
    <table class="table">
      <tbody>
        <tr>
          <th>日程</th>
          <th>天気</th>
          <th>降水量<br>(mm/h)</th>
          <th>気温</th>
        </tr>
        <tr v-for="(item, index) in items"
            :key=index
        >
          <td class="date-check">
            <div
              class="image-cheked image-cheked__background-checkin"
              v-if="item.isCheckInDate"
            >
              <img
                :src="require('@/assets/images/weathers/checkin-camp.png')"
              >
            </div>

            <div
              class="image-cheked image-cheked__background-checkout"
              v-if="item.isCheckOutDate"
            >
              <img
                :src="require('@/assets/images/weathers/checkout-camp.png')"
              >
            </div>
            <span
              :date-day="item.date"
              :class="[saturdayCol(item.date), sundayCol(item.date)]"
              v-html="displayDate(item.date)"
            >
          </td>
          <td>
            <img
              :src="require('@/assets/images/weathers/sun.png')"
              class="icon-weather"
            >
          </td>
          <td>0</td>
          <td>
            <span class="text-red">32°C </span>
            &nbsp;/&nbsp;
            <span class="text-blue">12°C</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// components

export default {
  name: 'ForecastTableDate',
  data() {
    return {
      items: [
        {
          isCheckInDate: true,
          date: '12/31/2021',
        },
        {
          date: '01/01/2022',
        },
        {
          isCheckOutDate: true,
          date: '01/02/2022',
        },
      ],
    };
  },
  methods: {
    displayDate(date) {
      return this.$helpers.toShortString(date);
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
      background-color: #eae5e5;
    }

    td {
      height: 34px;
      font-size: 14px;
    }

    th,
    td {
      padding: 0;
      border-top: 1px solid $color-border;
      border-right: 1px solid $color-border;
      border-bottom: none;
      border-left: none;
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

    .image-cheked {
      position: absolute;
      left: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 27px;
      height: 16px;

      img {
        width: 18px;
        height: 6.5px;
      }

      &__background-checkout {
        background-color: #ff0d0d;
      }

      &__background-checkin {
        background-color: #0ca206;
      }
    }

    .text-red {
      color: #f00;
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
