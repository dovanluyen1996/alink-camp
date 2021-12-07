<template>
  <div class="hourly-weather">
    <div class="card__title card__title--center">
      1時間ごとの天気
    </div>

    <div class="custom-table">
      <slot name="switcher" />

      <template v-if="$helpers.isPresentObject(forecastData)">
        <sticky-table class="hourly-weather-table">
          <tr class="date-row">
            <th
              scope="row"
              class="th"
            >
              日
            </th>
            <!-- NOTE: colspan = number of hourly-data plus sunset and sunrise cols -->
            <template v-for="forecast in forecastHourly.items">
              <template v-if="spanCount(forecast)">
                <td
                  :key="forecast.date"
                  :colspan="spanCount(forecast)"
                  :date-time="forecast.date"
                  :class="['date-col', saturdayCol(forecast.date), sundayCol(forecast.date)]"
                >
                  <div class="date-col__display-date">
                    {{ displayDate(forecast.date) }}
                    <span
                      v-if="isScheduledDate(forecast.date)"
                      class="is-today"
                    >
                      ゴルフ予定日
                    </span>
                  </div>
                </td>
              </template>
            </template>
          </tr>
          <time-row :forecast-data="margedForecastsAndSuns" />
          <weather-row :weathers="margedForecastsAndSuns" />
          <precipitation-row :forecast-data="forecastData" />
          <temperature-row :forecast-data="forecastData" />
          <wind-direction-row :wind-directions="windDirections" />
          <wind-speed-row :wind-speeds="windSpeeds" />
        </sticky-table>
      </template>

      <template v-else>
        <div class="no-forecast">
          表示できる天気情報がありません
        </div>
      </template>
    </div>
  </div>
</template>

<script>
// components
import StickyTable from '@/components/organisms/sticky-table';
import TimeRow from '@/components/organisms/weather-table/time-row';
import WeatherRow from '@/components/organisms/weather-table/weather-row';
import PrecipitationRow from '@/components/organisms/weather-table/precipitation-row';
import TemperatureRow from '@/components/organisms/weather-table/temperature-row';
import WindDirectionRow from '@/components/organisms/weather-table/wind-direction-row';
import WindSpeedRow from '@/components/organisms/weather-table/wind-speed-row';

export default {
  name: 'CoursesForecastTabHourlyWeather',
  components: {
    StickyTable,
    TimeRow,
    WeatherRow,
    PrecipitationRow,
    TemperatureRow,
    WindDirectionRow,
    WindSpeedRow,
  },
  data() {
    return {
      forecastHourly: {},
    };
  },
  computed: {
    course() {
      return this.$store.getters['course/choosenCourse'];
    },
    userCourse() {
      return this.$store.getters['models/userCourse/findByCourseId'](this.course.id);
    },
    userCoursePlan() {
      return this.$store.getters['models/userCourse/nearestPlan'](this.course.id);
    },
    margedForecastsAndSuns() {
      if (!this.forecastHourly.items) return [];

      let forecastsAndSuns = [];
      this.forecastHourly.items.forEach((forecastHourly) => {
        const suns = [
          {
            isSunrise: true,
            hour: forecastHourly.sunrise,
          },
          {
            isSunset: true,
            hour: forecastHourly.sunset,
          },
        ];
        const margeData = (forecastHourly.hourlyData || []).concat(suns).filter(data => data.hour);
        margeData.sort((a, b) => this.convertMinutes(a.hour) - this.convertMinutes(b.hour));

        forecastsAndSuns = forecastsAndSuns.concat(margeData);
      });

      return forecastsAndSuns;
    },
    forecastData() {
      if (!this.forecastHourly.items) return [];

      let forecastData = [];
      this.forecastHourly.items.forEach((forecastHourly) => {
        forecastData = forecastData.concat(forecastHourly
          .hourlyData
          .filter(hourlyData => hourlyData.hour));
      });

      return forecastData;
    },
    windDirections() {
      return this.forecastData ? this.forecastData.map(item => item.windDirection) : [];
    },
    windSpeeds() {
      return this.forecastData ? this.forecastData.map(item => item.windSpeed) : [];
    },
  },
  watch: {
    async course() {
      this.forecastHourly = await this.getForecastHourly();
    },
  },
  async created() {
    this.forecastHourly = await this.getForecastHourly();
  },
  updated() {
    this.$nextTick(() => {
      this.tableScrollNow();
    });
  },
  methods: {
    tableScrollNow() {
      // NOTE: セルのdate-time属性に時刻を入れてスクロール位置を取得している
      const table = this.$el.querySelector('.hourly-weather-table');
      if (!table) return;

      const dateRow = table.querySelector('.date-row');
      const timeRow = table.querySelector('.time-row');
      const th = timeRow.querySelector('th');
      const today = this.$moment();
      let nowCol = null;

      // if plan-date exists and not today, set the scroll's target to that plan-date
      if (!this.$helpers.isEmptyObject(this.userCoursePlan) && !this.isScheduledDate(today.format('YYYY-MM-DD'))) {
        const targetDate = this.$helpers.localDateWithHyphenFrom(this.userCoursePlan.targetAt);
        nowCol = dateRow.querySelector(`[date-time="${targetDate}"]`);
      }
      const targetAt = today.format('HH');
      // otherwise, set the scroll's to current time
      nowCol = nowCol || timeRow.querySelector(`[date-time="${targetAt}"]`);

      if (!nowCol) return;
      const x = nowCol.offsetLeft - th.offsetWidth;

      table.scrollTo(x, 0);
    },
    displayDate(date) {
      return this.$helpers.toDayString(date);
    },
    isScheduledDate(date) {
      if (!this.userCoursePlan.targetAt) return false;

      const scheduledDate = this.$helpers.localDateWithHyphenFrom(this.userCoursePlan.targetAt);
      return this.$moment(date).isSame(scheduledDate);
    },
    convertMinutes(time) {
      // NOTE: 日の出日の入りを天気予報にマージするため
      //       時間を比較できるように分にする
      if (!time) return 0;

      const newTime = time.split(':');
      return (Number(newTime[0]) * 60) + Number(newTime[1] || 0);
    },
    async getForecastHourly() {
      if (!this.course.id) return {};

      const params = {
        course_id: this.course.id,
      };
      const forecastHourly = await this.$store.dispatch('models/weather/getForecastHourly', params);
      return forecastHourly;
    },
    spanCount(forecast) {
      let count = forecast.hourlyData.filter(data => data.hour).length;
      if (forecast.sunrise) count += 1;
      if (forecast.sunset) count += 1;

      return count;
    },
    saturdayCol(date) {
      return this.$helpers.isSaturday(date) ? 'date-row__sarturday' : '';
    },
    sundayCol(date) {
      return this.$helpers.isSunday(date) ? 'date-row__sunday' : '';
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

/deep/ {
  .table {
    text-align: center;

    th,
    td {
      padding: 4px;
    }
  }

  .th {
    white-space: nowrap;
  }
}

.date-row {
  text-align: left;

  &__sarturday {
    color: #113095;
    background-color: #e3f6ff;
  }

  &__sunday {
    color: #9d1d1d;
    background-color: #ffeaea;
  }
}

.is-today {
  color: $color-is-today;
}

.no-forecast {
  margin: 2rem auto 2rem auto;
  text-align: center;
}

.custom-table{
  padding: 0 10px;
}
</style>
