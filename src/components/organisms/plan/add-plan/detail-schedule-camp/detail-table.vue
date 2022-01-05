<template>
  <div class="table-detail">
    <div class="card-detail"
      v-for="(item, index) in items"
      :key=index
    >
      <div class="date-detail">
        <span>
          {{ item.date }}
        </span>
      </div>
      <table class="table">
        <tbody>
          <tr>
            <th>時</th>
            <th>天気</th>
            <th>気温</th>
            <th>降水量<br>(mm/h)</th>
            <th>風<br>(m/s)</th>
            <th>タスク</th>
          </tr>
          <tr class="detail-row"
              v-for="(detail,index) in details"
              :key=index
          >
            <td class="time-col">
              {{ detail.time_col }}
            </td>
            <td>
              <div class="weather">
                <img
                  :src="require('@/assets/images/weathers/sun.png')"
                  class="icon-weather"
                >
              </div>
            </td>
            <td>
              <div class="temperature">
                <span class="temperature__value">
                  {{ detail.temperature__value }}
                </span>
                <span class="temperature__unit">
                  ℃
                </span>
              </div>
            </td>
            <td>10</td>
            <td>99</td>
            <td class="task">
              <div class="task__text">
                <span>
                  {{ detail.textTask }}
                </span>
              </div>
              <img
                  :src="require('@/assets/images/weathers/icon-more.png')"
                  class="task__icon"
                  v-if="detail.isAddTask"
                >
                <img
                  :src="require('@/assets/images/weathers/icon-edit.png')"
                  class="task__icon"
                  v-if="detail.isEditTask"
                >
            </td>
          </tr>
        </tbody>
      </table>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'DetailTable',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      details: [
        {
          time_col: 0,
          temperature__value: 10,
          textTask: '焚き火の準備と食事の準備をするあああああああ...',
          isEditTask: true,
        },
        {
          time_col: 1,
          temperature__value: 11,
          textTask: '',
          isAddTask: true,
        },
        {
          time_col: 2,
          temperature__value: 10,
          textTask: '焚き火の準備と食事の準備をするあああああああ...',
          isEditTask: true,
        },
        {
          time_col: 3,
          temperature__value: 11,
          textTask: '',
          isAddTask: true,
        },
        {
          time_col: 4,
          temperature__value: 10,
          textTask: '焚き火の準備と食事の準備をするあああああああ...',
          isEditTask: true,
        },
        {
          time_col: 5,
          temperature__value: 11,
          textTask: '',
          isAddTask: true,
        },
        {
          time_col: 6,
          temperature__value: 10,
          textTask: '焚き火の準備と食事の準備をするあああああああ...',
          isEditTask: true,
        },
        {
          time_col: 7,
          temperature__value: 11,
          textTask: '',
          isAddTask: true,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.table-detail {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  overflow: auto;

  .card-detail {
    margin-top: 50px;
  }

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
      font-size: 10px;
      font-weight: 600;
    }

    th,
    td {
      border-top: 1px solid $color-border;
      border-right: 1px solid $color-border;
      border-left: none;
    }

    .detail-task,
    .time-col {
      font-size: 12px;
    }

    .weather {
      .icon-weather {
        width: 35px;
        height: 21px;
      }
    }

    .temperature {
      display: inline-flex;

      &__value {
        font-size: 10px;
        font-weight: 600;
      }

      &__unit {
        padding-top: 2px;
        font-size: 8px;
        font-weight: 300;
      }
    }

    .task {
      position: relative;

      &__text {
        padding-right: 25px;
      }

      &__icon {
        position: absolute;
        top: 50%;
        right: -5px;
        width: 24px;
        height: 24px;
        transform: translate(-50%, -50%);
      }
    }
  }

  .date-detail {
    display: flex;
    align-items: center;
    height: 34px;
    background-color: #f29678;

    span {
      padding-left: 5px;
      font-size: 18px;
      font-weight: 600;
    }
  }

  .circle {
    width: 20px;
    height: 20px;
    margin: 0 auto;
    margin-top: 5px;
    background-color: $color-white;
    border: 1px solid $color-border-hight;
    border-radius: 50%;
  }
}
</style>
