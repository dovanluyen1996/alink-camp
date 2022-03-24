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
      <table class="table">
        <tbody>
          <tr>
            <th>時</th>
            <th>天気</th>
            <th>気温</th>
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
import CampsitePlanWeather from '@/components/organisms/campsite-plans/weather';
import CampsitePlanImage from '@/components/organisms/campsite-plans/image';
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
      const targetAt = this.$moment(`${date} ${hour}:00`).format('YYYY-MM-DD HH:mm');
      const task = this.tasks[targetAt] || '';

      return task;
    },
    getWeather(date, hour) {
      if (!this.items[date]) return null;
      if (!this.items[date][hour]) return null;

      return this.items[date][hour];
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
