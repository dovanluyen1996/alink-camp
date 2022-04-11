<template>
  <div class="table-detail">
    <div
      v-for="(date, index) in dateRange"
      :key="index"
      class="card-detail"
    >
      <v-ons-card class="campsite-weather-and-image">
        <v-ons-row class="campsite-weather-and-image-row">
          <campsite-plan-weather
            v-if="dayWeathers[date]"
            :weather="dayWeathers[date]"
          />
          <v-ons-col
            v-else
            class="no-data"
          >
            <label width="150px">No Data</label>
          </v-ons-col>
          <campsite-plan-image
            :value="memories[date]"
            :date="date"
            @updateImage="updateImage"
          />
        </v-ons-row>
      </v-ons-card>

      <div class="date-detail">
        <span>
          {{ date }}
        </span>
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
import CampsitePlanWeather from '@/components/organisms/plan/past/memory/weather';
import CampsitePlanImage from '@/components/organisms/plan/past/memory/image';
import EditDialogTask from '@/components/organisms/edit-dialog-task';
import WeatherImage from '@/components/atoms/weather-image';
import Temperature from '@/components/atoms/temperature';

export default {
  name: 'DetailTable',
  components: {
    CampsitePlanWeather,
    CampsitePlanImage,
    EditDialogTask,
    WeatherImage,
    Temperature,
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
    memories: {
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
    dayWeathers() {
      if (!this.dateRange.length || !this.forecasts.items) return [];

      const fn = (acc, cur) => {
        const { hourlyData, ...dayWeather } = cur;
        acc[dayWeather.date] = dayWeather;
        return acc;
      };

      return this.forecasts.items.reduce(fn, {});
    },
    dateRange() {
      return this.$store.getters['plan/dateRange'];
    },
  },
  methods: {
    updateImage(date, memory) {
      this.$emit('update:memories', { ...this.memories, [date]: memory });
    },
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

  .time-scedules {
    width: 100%;
    margin-bottom: 70px;
    text-align: center;
    background: #fff;

    .detail-row {
      background-color: $color-white;
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

    td {
      padding: 7px 0;
    }

    .detail-task,
    .target {
      font-size: $font-size-small;
    }

    .temperature {
      display: inline-flex;
      padding: 5px;

      &__value {
        font-size: $font-size-small;
        font-weight: 600;
      }

      &__unit {
        font-size: $font-size-small;
        font-weight: 600;
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

.campsite-weather-and-image {
  text-align: center;
}

.campsite-weather-and-image-row {
  flex-direction: column;
}

.campsite-weather-col {
  margin-right: 0;
  margin-bottom: 15px;
}

@media screen and (min-width: 320px) {
  .campsite-weather-and-image-row {
    flex-direction: row;
  }

  .campsite-weather-col {
    flex: 0 0 50%;
    max-width: 50%;
    padding-right: 0;
    margin-bottom: 0;
  }

  .campsite-image-col {
    flex: 0 0 50%;
    max-width: 50%;
    padding-left: 5px;

    .share-button {
      min-width: 90%;
    }
  }
}

@media screen and (min-width: 375px) {
  .campsite-weather-col {
    padding-right: 15px;
  }

  .campsite-image-col {
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
  .campsite-image-col {
    .share-button {
      min-width: 95%;
    }
  }
}

@media screen and (min-width: 375px) {
  .campsite-image-col {
    .share-button {
      min-width: 140px;
    }
  }
}
</style>
