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
                      キャンプ予定日
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
          <humidity-row
            :humidities="humidities"
            :is-show-hourly="true"
          />
          <wind-direction-row :wind-directions="windDirections" />
          <wind-speed-row :wind-speeds="windSpeeds" />
        </sticky-table>

        <div class="table-note">
          信頼度：A～Eの表示は、予報の信頼度です。低い場合は今後の予報が変わる可能性があります
        </div>
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
import moment from 'moment';

// components
import StickyTable from '@/components/organisms/sticky-table';
import TimeRow from '@/components/organisms/weather-table/time-row';
import WeatherRow from '@/components/organisms/weather-table/weather-row';
import PrecipitationRow from '@/components/organisms/weather-table/precipitation-row';
import HumidityRow from '@/components/organisms/weather-table/humidity-row';
import TemperatureRow from '@/components/organisms/weather-table/temperature-row';
import WindDirectionRow from '@/components/organisms/weather-table/wind-direction-row';
import WindSpeedRow from '@/components/organisms/weather-table/wind-speed-row';

export default {
  name: 'CampsitesForecastTabHourlyWeather',
  components: {
    StickyTable,
    TimeRow,
    WeatherRow,
    PrecipitationRow,
    HumidityRow,
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
    campsite() {
      return this.$store.getters['campsite/choosenCampsite'];
    },
    futurePlans() {
      return this.$store.getters['models/userCampsitePlan/inFuture']({ campsiteId: this.campsite.id });
    },
    nearestPlan() {
      const sortPlans = [...this.futurePlans].sort(
        (a, b) => moment(a.startedDate).diff(b.startedDate),
      );
      return sortPlans[0] || null;
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
    humidities() {
      return this.forecastData ? this.forecastData.map(item => item.humidity) : [];
    },
    windDirections() {
      return this.forecastData ? this.forecastData.map(item => item.windDirection) : [];
    },
    windSpeeds() {
      return this.forecastData ? this.forecastData.map(item => item.windSpeed) : [];
    },
  },
  watch: {
    async campsite() {
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
      if (this.nearestPlan && this.$helpers.isAfterDate(this.nearestPlan.startedDate, today)) {
        nowCol = dateRow.querySelector(`[date-time="${this.nearestPlan.startedDate}"]`);
      }
      const targetAt = today.format('HH');
      // otherwise, set the scroll's to current time
      nowCol = nowCol || timeRow.querySelector(`[date-time="${targetAt}"]`);

      if (!nowCol) return;
      // NOTE: tdにborder-leftがあるため、その分xを1ずらす
      const x = nowCol.offsetLeft - th.offsetWidth + 1;

      table.scrollTo(x, 0);
    },
    displayDate(date) {
      return this.$helpers.toDayString(date);
    },
    isScheduledDate(date) {
      if (this.futurePlans.length === 0) return false;

      const targetDate = moment(date).startOf('day');
      return this.futurePlans.some(plan => targetDate.isBetween(plan.startedDate, plan.finishedDate, null, '[]'));
    },
    convertMinutes(time) {
      // NOTE: 日の出日の入りを天気予報にマージするため
      //       時間を比較できるように分にする
      if (!time) return 0;

      const newTime = time.split(':');
      return (Number(newTime[0]) * 60) + Number(newTime[1] || 0);
    },
    async getForecastHourly() {
      if (!this.campsite.id) return {};

      const params = {
        campsite_id: this.campsite.id,
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

.card {
  &__title {
    color: #000;
  }
}

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
  display: flex;
  align-items: center;
  justify-content: center;
  height: 250px;
}

.custom-table {
  padding: 0 10px;
}

.table-note {
  margin-top: 10px;
  font-size: 12px;
  line-height: 14px;
}
</style>
