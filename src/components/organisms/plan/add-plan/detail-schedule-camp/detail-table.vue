<template>
  <div class="table-detail">
    <div
      v-for="(date, index) in dateRange"
      :key="index"
      class="card-detail"
    >
      <div class="date-detail">
        <span>
          {{ date }}
        </span>
        <share-button
          :subject="shareSubject"
          :message="shareMessage"
        >
          <template #text>
            予定共有
          </template>
        </share-button>
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
          <tr
            v-for="(hour, index) in hours"
            :key="index"
            class="detail-row"
          >
            <td class="target">
              {{ hour }}
            </td>
            <td>
              <weather-image
                :weather="getWeather(date, hour)"
                image-width="35px"
              />
            </td>
            <td>
              <temperature
                :value="getWeather(date, hour) ? getWeather(date, hour).temperature : ''"
              />
            </td>
            <td>{{ precipitationText(getWeather(date, hour)) }}</td>
            <td>
              <div
                v-if="getWeather(date, hour)"
                class="wind-direction"
              >
                <template v-if="getWeather(date, hour).windSpeed > 0">
                  <div :class="['wind-speed', windSpeedRate(getWeather(date, hour).windSpeed)]" />
                  <span>{{ getWeather(date, hour).windSpeed }}</span>
                </template>
                <template v-else>
                  {{ getWeather(date, hour).windDirection }}
                </template>
              </div>
              <div
                v-else
                class="wind-direction"
              >
                --
              </div>
            </td>
            <td class="task">
              <div class="task__text">{{ taskText(date, hour) }}</div>
              <img
                v-if="isContentEmpty(taskText(date, hour))"
                :src="require('@/assets/images/icon-more.png')"
                class="task__icon"
                @click="editTaskAt(date, hour)"
              >
              <img
                v-else
                :src="require('@/assets/images/icon-edit.png')"
                class="task__icon"
                @click="editTaskAt(date, hour)"
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <edit-dialog-task
      :is-visible="updateDataVisible"
      :tasks.sync="tasks"
      :targetAt="targetAt"
      @close="closePopup"
    />
  </div>
</template>

<script>
// components
import EditDialogTask from '@/components/organisms/edit-dialog-task';
import WeatherImage from '@/components/atoms/weather-image';
import Temperature from '@/components/atoms/temperature';
import ShareButton from '@/components/organisms/share-button';

export default {
  name: 'DetailTable',
  components: {
    EditDialogTask,
    WeatherImage,
    Temperature,
    ShareButton,
  },
  props: {
    forecasts: {
      type: Object,
      required: true,
    },
    tasks: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      targetAt: '',
      hours: [...Array(24).keys()],
      updateDataVisible: false,
    };
  },
  computed: {
    items() {
      if (!this.dateRange.length || !this.forecasts.items) return [];

      const items = this.forecasts.items.reduce((dateAcc, dateCur) => {
        const hourlyData = dateCur.hourlyData.reduce((hourAcc, hourCur) => {
          hourAcc[parseInt(hourCur.hour, 10)] = hourCur;
          return hourAcc;
        }, {});

        dateAcc[dateCur.date] = hourlyData;
        return dateAcc;
      }, {});

      return items;
    },
    dateRange() {
      return this.$store.getters['plan/dateRange'];
    },
    shareSubject() {
      return '予定シェアタイトル';
    },
    shareMessage() {
      return '予定シェアメッセージ';
    },
  },
  methods: {
    taskText(date, hour) {
      const targetAt = this.$moment(`${date} ${hour}:00`).format('YYYY-MM-DD HH:mm');
      const task = this.tasks[targetAt] || '';

      return task;
    },
    getWeather(date, hour) {
      if (!this.items[date]) return null;
      if (!this.items[date][hour]) return null;

      return this.items[date][hour];
    },
    precipitationText(weather) {
      return this.$helpers.isEmpty(weather) ? '--' : weather.precip;
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
    editTaskAt(date, hour) {
      this.updateDataVisible = true;
      this.targetAt = this.$moment(`${date} ${hour}:00`).format('YYYY-MM-DD HH:mm');
    },
    closePopup() {
      this.$emit('update:tasks', this.tasks);
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

$speed-degrees: 0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180,
  202.5, 225, 247.5, 270, 292.5, 315, 337.5;

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
        width: 15px;
        height: 24px;
        margin-left: 2px;
      }

      span {
        font-size: 12px;
      }
    }
  }
}
</style>
