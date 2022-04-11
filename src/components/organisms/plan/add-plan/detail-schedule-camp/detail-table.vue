<template>
  <div class="table-detail">
    <div
      v-for="(date, index) in dateRange"
      :key="index"
      class="card-detail"
    >
      <div class="date-detail">
        <span>
          {{ localMonthDateFromWithoutZero(date) }}
        </span>
        <share-button
          :subject="shareSubject()"
          :message="shareMessage(date)"
        >
          <template #text>
            予定共有
          </template>
        </share-button>
      </div>
      <table class="table time-scedules">
        <tbody>
          <tr>
            <th class="time-scedules__hour-head">
              時
            </th>
            <th class="time-scedules__weather-head">
              天気
            </th>
            <th class="time-scedules__temperature-head">
              気温
            </th>
            <th class="time-scedules__rain-head">
              降水量<br>
              <span class="text-small">(mm/h)</span>
            </th>
            <th class="time-scedules__wind-head">
              風<br>
              <span class="text-small">(m/s)</span>
            </th>
            <th class="time-scedules__task-head">
              タスク
            </th>
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
                image-width="30px"
              />
            </td>
            <td>
              <temperature
                :value="getWeather(date, hour) ? getWeather(date, hour).temperature : ''"
              />
            </td>
            <td>{{ precipitationText(getWeather(date, hour)) }}</td>
            <td>
              <wind-direction
                :wind-speed="getWeather(date, hour) ? getWeather(date, hour).windSpeed : ''"
                :wind-direction="getWeather(date, hour) ? getWeather(date, hour).windDirection: ''"
              />
            </td>
            <td class="task">
              <div class="task__text">
                {{ taskText(date, hour) }}
              </div>
              <img
                v-if="isContentEmpty(taskText(date, hour))"
                :src="require('@/assets/images/icon-more.png')"
                class="task__icon"
                width="24px"
                height="24px"
                @click="editTaskAt(date, hour)"
              >
              <img
                v-else
                :src="require('@/assets/images/icon-edit.png')"
                class="task__icon"
                width="24px"
                height="24px"
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
      :target-at="targetAt"
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
import WindDirection from '@/components/organisms/plan/add-plan/list-item-camp/wind-direction';

export default {
  name: 'DetailTable',
  components: {
    EditDialogTask,
    WeatherImage,
    Temperature,
    ShareButton,
    WindDirection,
  },
  props: {
    forecasts: {
      type: Object,
      required: true,
    },
    pastWeather: {
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
      return { ...this.pastItems, ...this.futureItems };
    },
    futureItems() {
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
    pastItems() {
      if (!this.dateRange.length || !this.pastWeather.items) return [];

      const items = this.pastWeather.items.reduce((dateAcc, dateCur) => {
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
  },
  methods: {
    taskText(date, hour) {
      const targetAt = this.formatDateTime(date, hour);
      const task = this.$helpers.truncate(this.tasks[targetAt] || '', 7);

      return task;
    },
    getWeather(date, hour) {
      if (!this.items[date]) return null;
      if (!this.items[date][hour]) return null;

      return this.items[date][hour];
    },
    precipitationText(weather) {
      if (this.$helpers.isEmpty(weather)) return '--';
      if (!weather.precip) return '--';

      return weather.precip;
    },
    forecastTelopText(weather) {
      if (this.$helpers.isEmpty(weather) || !weather.forecastTelop) return '--';

      return weather.forecastTelop;
    },
    temperatureText(weather) {
      if (this.$helpers.isEmpty(weather) || !weather.temperature) return '--';

      return weather.temperature;
    },
    windSpeedText(weather) {
      if (this.$helpers.isEmpty(weather) || !weather.windSpeed) return '--';

      return weather.windSpeed;
    },
    editTaskAt(date, hour) {
      this.updateDataVisible = true;
      this.targetAt = this.formatDateTime(date, hour);
    },
    formatDateTime(date, hour) {
      const padHour = String(hour).padStart(2, '0');
      return this.$moment(`${date} ${padHour}:00`).format('YYYY-MM-DD HH:mm');
    },
    closePopup() {
      this.$emit('update:tasks', this.tasks);
      this.updateDataVisible = false;
    },
    isContentEmpty(content) {
      return content === '';
    },
    shareSubject() {
      return 'キャンプ情報共有';
    },
    shareMessage(date) {
      const messages = this.hours.map((hour) => {
        const hourlyMessages = [];
        const weather = this.getWeather(date, hour);

        hourlyMessages.push(`${hour}時`);
        // 天気情報
        hourlyMessages.push(this.forecastTelopText(weather));
        hourlyMessages.push(`${this.temperatureText(weather)}℃`);
        hourlyMessages.push(`${this.precipitationText(weather)}mm/h`);
        hourlyMessages.push(`${this.windSpeedText(weather)}m/s`);
        // タスク
        const task = this.taskText(date, hour);
        if (!this.isContentEmpty(task)) {
          // 先頭は意図的に空白を挿入していることを考慮して、末尾のみ空白・改行は取り除く
          hourlyMessages.push(task.trimEnd());
        }

        return hourlyMessages.join('\n');
      });

      // 時間毎に１行空行を入れる
      return messages.join('\n\n');
    },
    localMonthDateFromWithoutZero(date) {
      return this.$helpers.localMonthDateFromWithoutZero(date);
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

  .date-detail {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 43px;
    background-color: #eae5e5;

    span {
      font-size: 14px;
      font-weight: bold;
    }
  }

  .time-scedules {
    width: 100%;
    font-size: $font-size-small;
    text-align: center;
    background: #fff;

    .detail-row {
      background-color: $color-white;
    }

    .text-small {
      // NOTE: font-sizeのルール外だが補足のため情報の優先度は低いとみなして例外的に小さくする
      font-size: 10px;
    }

    th {
      padding: 7px 0;
      background-color: #eae5e5;
    }

    .time-scedules__hour-head {
      width: 35px;
    }

    .time-scedules__weather-head {
      width: 40px;
    }

    .time-scedules__temperature-head {
      width: 45px;
    }

    .time-scedules__rain-head {
      width: 45px;
    }

    .time-scedules__wind-head {
      width: 35px;
    }

    td {
      padding: 7px 0;
    }

    .detail-task,
    .target {
      font-size: $font-size-small;
    }

    .temperature {
      display: inline-flex;
      min-width: 30px;
      padding: 5px;

      &__value {
        font-size: $font-size-small;
      }

      &__unit {
        font-size: $font-size-small;
      }
    }

    .task {
      position: relative;

      &__text {
        padding-right: 30px;
        padding-left: 7px;
        text-align: left;
        word-break: break-word;
      }

      &__icon {
        position: absolute;
        top: 50%;
        right: 5px;
        transform: translateY(-50%);
      }
    }
  }
}
</style>
