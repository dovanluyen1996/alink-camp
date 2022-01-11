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
      </div>
      <table class="table">
        <tbody>
          <tr>
            <th>時</th>
            <th>天気</th>
            <th>気温</th>
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
                  :src="require('@/assets/images/weathers/sun.png')"
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
            <td class="task">
              <div class="task__text">
                <span>
                  {{ detail.content }}
                </span>
              </div>
              <img
                  v-if="isContentEmpty(detail.content)"
                  :src="require('@/assets/images/weathers/icon-more.png')"
                  class="task__icon"
                  @click="showPopup()"
                >
                <img
                  v-else
                  :src="require('@/assets/images/weathers/icon-edit.png')"
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
        },
        {
          targetAt: 1,
          temp: 11,
          content: '',
        },
        {
          targetAt: 2,
          temp: 10,
          content: '焚き火の準備と食事の準備をするあああああああ...',
        },
        {
          targetAt: 3,
          temp: 11,
          content: '',
        },
        {
          targetAt: 4,
          temp: 10,
          content: '焚き火の準備と食事の準備をするあああああああ...',
        },
        {
          targetAt: 5,
          temp: 11,
          content: '',
        },
        {
          targetAt: 6,
          temp: 10,
          content: '焚き火の準備と食事の準備をするあああああああ...',
        },
        {
          targetAt: 7,
          temp: 11,
          content: '',
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

  .table {
    width: 100%;
    margin-bottom: 70px;
    text-align: center;

    .detail-row {
      background-color: $color-white;
    }

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
}
</style>
