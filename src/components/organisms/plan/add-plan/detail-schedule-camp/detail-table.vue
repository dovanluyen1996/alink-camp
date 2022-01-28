<template>
  <div class="table-detail">
    <div class="card-detail"
      v-for="(item, index) in items"
      :key="index"
    >
      <div class="date-detail">
        <span>
          {{ item.date }}
        </span>
        <v-ons-button
        class="button--share"
        >
          予定共有
        </v-ons-button>
      </div>
      <table class="table">
        <tbody>
          <tr>
            <th>時</th>
            <th>天気</th>
            <th>気温</th>
            <th>
              降水量<br>
              <span class="text-small">(mm/h)</span>
            </th>
            <th>
              風<br>
              <span class="text-small">(m/s)</span>
            </th>
            <th>タスク</th>
          </tr>
          <tr class="detail-row"
              v-for="(detail,index) in details"
              :key="index"
          >
            <td class="target">
              {{ detail.targetAt }}
            </td>
            <td>
              <div class="weather">
                <img
                  :src="require('@/assets/images/weathers/weather/01.png')"
                  class="icon-weather"
                >
              </div>
            </td>
            <td>
              <div class="temperature">
                <span class="temperature__value">
                  {{ detail.temp }}
                </span>
                <span class="temperature__unit">
                  ℃
                </span>
              </div>
            </td>
            <td>{{ detail.precipitation }}</td>
            <td>{{ detail.wind }}</td>
            <td class="task">
              <div class="task__text">
                <span>
                  {{ detail.content }}
                </span>
              </div>
              <img
                  v-if="isContentEmpty(detail.content)"
                  :src="require('@/assets/images/icon-more.png')"
                  class="task__icon"
                  @click="showPopup()"
                >
                <img
                  v-else
                  :src="require('@/assets/images/icon-edit.png')"
                  class="task__icon"
                  @click="showPopup()"
                >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <edit-dialog-task :isVisible="updateDataVisible" @close="closePopup" />
  </div>
</template>

<script>
// components
import EditDialogTask from '@/components/organisms/edit-dialog-task';

export default {
  name: 'DetailTable',
  components: {
    EditDialogTask,
  },
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
          targetAt: 0,
          temp: 10,
          content: '焚き火の準備と食事の準備をするあああああああ...',
          precipitation: '10',
          wind: '99',
        },
        {
          targetAt: 1,
          temp: 11,
          content: '',
          precipitation: '10',
          wind: '99',
        },
        {
          targetAt: 2,
          temp: 10,
          content: '焚き火の準備と食事の準備をするあああああああ...',
          precipitation: '10',
          wind: '99',
        },
        {
          targetAt: 3,
          temp: 11,
          content: '',
          precipitation: '10',
          wind: '99',
        },
        {
          targetAt: 4,
          temp: 10,
          content: '焚き火の準備と食事の準備をするあああああああ...',
          precipitation: '10',
          wind: '99',
        },
        {
          targetAt: 5,
          temp: 11,
          content: '',
          precipitation: '10',
          wind: '99',
        },
        {
          targetAt: 6,
          temp: 10,
          content: '焚き火の準備と食事の準備をするあああああああ...',
          precipitation: '10',
          wind: '99',
        },
        {
          targetAt: 7,
          temp: 11,
          content: '',
          precipitation: '10',
          wind: '99',
        },
        {
          targetAt: 8,
          temp: 10,
          content: '焚き火の準備と食事の準備をするあああああああ...',
          precipitation: '10',
          wind: '99',
        },
        {
          targetAt: 9,
          temp: 11,
          content: '',
          precipitation: '10',
          wind: '99',
        },
        {
          targetAt: 10,
          temp: 10,
          content: '焚き火の準備と食事の準備をするあああああああ...',
          precipitation: '10',
          wind: '99',
        },
        {
          targetAt: 11,
          temp: 11,
          content: '',
          precipitation: '10',
          wind: '99',
        },
        {
          targetAt: 12,
          temp: 10,
          content: '焚き火の準備と食事の準備をするあああああああ...',
          precipitation: '10',
          wind: '99',
        },
        {
          targetAt: 13,
          temp: 11,
          content: '',
          precipitation: '10',
          wind: '99',
        },
        {
          targetAt: 14,
          temp: 10,
          content: '焚き火の準備と食事の準備をするあああああああ...',
          precipitation: '10',
          wind: '99',
        },
        {
          targetAt: 15,
          temp: 11,
          content: '',
          precipitation: '10',
          wind: '99',
        },
        {
          targetAt: 16,
          temp: 10,
          content: '焚き火の準備と食事の準備をするあああああああ...',
          precipitation: '10',
          wind: '99',
        },
        {
          targetAt: 17,
          temp: 11,
          content: '',
          precipitation: '10',
          wind: '99',
        },
        {
          targetAt: 18,
          temp: 10,
          content: '焚き火の準備と食事の準備をするあああああああ...',
          precipitation: '10',
          wind: '99',
        },
        {
          targetAt: 19,
          temp: 11,
          content: '',
          precipitation: '10',
          wind: '99',
        },
        {
          targetAt: 20,
          temp: 10,
          content: '焚き火の準備と食事の準備をするあああああああ...',
          precipitation: '10',
          wind: '99',
        },
        {
          targetAt: 21,
          temp: 11,
          content: '',
          precipitation: '10',
          wind: '99',
        },
        {
          targetAt: 22,
          temp: 10,
          content: '焚き火の準備と食事の準備をするあああああああ...',
          precipitation: '10',
          wind: '99',
        },
        {
          targetAt: 23,
          temp: 11,
          content: '',
          precipitation: '10',
          wind: '99',
        },
      ],
      updateDataVisible: false,
    };
  },
  methods: {
    showPopup() {
      this.updateDataVisible = true;
    },
    closePopup() {
      this.updateDataVisible = false;
    },
    isContentEmpty(content) {
      return content === '';
    },
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
    margin-top: 10px;
  }

  .card-detail:last-child {
    margin-bottom: 140px;
  }

  .table {
    width: 100%;
    text-align: center;

    .detail-row {
      background-color: $color-white;
    }

    .text-small {
      font-size: 12px;
    }

    th {
      height: 36px;
      font-size: 12px;
      font-weight: 600;
      background-color: #eae5e5;
    }

    td {
      height: 45px;
      font-size: 12px;
      font-weight: 600;
    }

    .detail-task,
    .target {
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
      padding: 5px;

      &__value {
        font-size: 12px;
        font-weight: 600;
      }

      &__unit {
        font-size: 12px;
        font-weight: 600;
      }
    }

    .task {
      position: relative;

      &__text {
        padding-right: 25px;
        font-size: 12px;
        text-align: left;
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
}

.date-detail {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 43px;
  background-color: #eae5e5;

  span {
    font-size: 14px;
    font-weight: 600;
  }
}

.button--share {
  position: absolute;
  right: 10px;
  display: flex;
  align-items: center;
  width: 110px;
  height: 29px;
  font-size: 14px;
  font-weight: 600;
  background-color: #ff980b;
  border-radius: 15px;

  &::before {
    display: inline-block;
    width: 13px;
    height: 15px;
    margin-right: 6px;
    content: '';
    background-image: url("~@/assets/images/icon-share.png");
    background-position: center;
    background-size: 100%;
  }
}
</style>
