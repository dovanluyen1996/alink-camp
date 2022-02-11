<template>
  <div class="table-detail">
    <div class="card-detail"
      v-for="(item, index) in weather"
      :key="index"
    >
      <v-ons-card class="course-weather-and-image">
        <v-ons-row class="course-weather-and-image-row">
          <campsite-plan-weather
            v-if="weather"
            :weather="weather[index]"
          />
          <v-ons-col
            v-else
            class="no-data"
          >
            <label width="150px">No Data</label>
          </v-ons-col>
          <campsite-plan-image :value="image" />
        </v-ons-row>
      </v-ons-card>

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
            v-for="(detail, i) in item.details"
            :key="i"
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
import CampsitePlanWeather from '@/components/organisms/campsite-plans/weather';
import CampsitePlanImage from '@/components/organisms/campsite-plans/image';
import EditDialogTask from '@/components/organisms/edit-dialog-task';

export default {
  name: 'DetailTable',
  components: {
    CampsitePlanWeather,
    CampsitePlanImage,
    EditDialogTask,
  },
  data() {
    return {
      // TODO: ロジックに合うようにデータ構造を変更する
      // Change the data structure to fit the logic.
      weather: [
        {
          date: '12/31',
          maxTemp: '32',
          minTemp: '18',
          weatherImageName: '01.png',
          forecastTelop: '曇のち晴',
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
        },
        {
          date: '01/01',
          maxTemp: '32',
          minTemp: '18',
          weatherImageName: '01.png',
          forecastTelop: '曇のち晴',
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
        },
        {
          date: '01/02',
          maxTemp: '32',
          minTemp: '18',
          weatherImageName: '01.png',
          forecastTelop: '曇のち晴',
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
        },
        {
          date: '01/03',
          maxTemp: '32',
          minTemp: '18',
          weatherImageName: '01.png',
          forecastTelop: '曇のち晴',
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
        },
      ],
      image: {
        url: 'https://www.w3schools.com/css/img_5terre.jpg', // TODO: Please delete this mock data when implement Logic
      },
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

  .date-detail {
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
}

.course-weather-and-image {
  text-align: center;
}

.course-weather-and-image-row {
  flex-direction: column;
}

.course-weather-col {
  margin-right: 0;
  margin-bottom: 15px;
}

@media screen and (min-width: 320px) {
  .course-weather-and-image-row {
    flex-direction: row;
  }

  .course-weather-col {
    flex: 0 0 50%;
    max-width: 50%;
    padding-right: 0;
    margin-bottom: 0;
  }

  .course-image-col {
    flex: 0 0 50%;
    max-width: 50%;
    padding-left: 5px;

    .share-button {
      min-width: 90%;
    }
  }
}

@media screen and (min-width: 375px) {
  .course-weather-col {
    padding-right: 15px;
  }

  .course-image-col {
    padding-left: 0;

    .share-button {
      min-width: 140px;
    }
  }
}

.no-data {
  margin: auto;
  font-size: 16px;
  font-weight: bold;
}

@media screen and (min-width: 320px) {
  .course-image-col {
    .share-button {
      min-width: 95%;
    }
  }
}

@media screen and (min-width: 375px) {
  .course-image-col {
    .share-button {
      min-width: 140px;
    }
  }
}
</style>
