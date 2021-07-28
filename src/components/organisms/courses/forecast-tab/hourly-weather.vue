<template>
  <div class="hourly-weather">
    <div class="card__title card__title--center">
      1時間ごとの天気
    </div>

    <slot name="switcher" />

    <sticky-table class="hourly-weather-table">
      <tr class="date-row">
        <th
          scope="row"
          class="th"
        >
          日
        </th>
        <!-- NOTE: stick表示にしたいのであえてcolspanはつけない -->
        <td class="date-col">
          <div class="date-col__display-date">
            {{ displayDate }}
            <span
              v-if="isToday"
              class="is-today"
            >
              ゴルフ予定日
            </span>
          </div>
        </td>
      </tr>
      <time-row :forecast-data="margedForecastsAndSuns" />
      <weather-row :weathers="margedForecastsAndSuns" />
      <precipitation-row :forecast-data="forecastData" />
      <temperature-row :forecast-data="forecastData" />
      <wind-direction-row :wind-directions="windDirections" />
      <wind-speed-row :wind-speeds="windSpeeds" />
    </sticky-table>
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
    displayDate() {
      return this.$helpers.toDayString(this.forecastHourly.date);
    },
    isToday() {
      const today = this.$helpers.localDateWithHyphenFrom(new Date());
      if (!this.userCoursePlan.targetAt) return false;

      return this.$moment(today).isSame(this.forecastHourly.date);
    },
    margedForecastsAndSuns() {
      const suns = [
        {
          isSunrise: true,
          hour: this.forecastHourly.sunrise,
        },
        {
          isSunset: true,
          hour: this.forecastHourly.sunset,
        },
      ];
      const margeData = (this.forecastHourly.items || []).concat(suns);

      return margeData.sort((a, b) => this.convertMinutes(a.hour) - this.convertMinutes(b.hour));
    },
    forecastData() {
      return this.forecastHourly.items || [];
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
      const timeRow = table.querySelector('.time-row');
      const th = timeRow.querySelector('th');
      const targetAt = this.$moment().format('HH');
      const nowCol = timeRow.querySelector(`[date-time="${targetAt}"]`);
      if (!nowCol) return;
      const x = nowCol.offsetLeft - th.offsetWidth;

      table.scrollTo(x, 0);
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
        target_date: this.$helpers.localDateWithHyphenFrom(this.userCoursePlan.targetAt),
      };
      const forecastHourly = await this.$store.dispatch('models/weather/getForecastHourly', params);
      return forecastHourly;
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

/deep/ {
  .table {
    text-align: center;
  }

  .th {
    white-space: nowrap;
  }
}

.date-row {
  text-align: left;
}

.date-col {
  position: sticky;
  left: 63px;

  &__display-date {
    position: absolute;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    white-space: nowrap;
  }
}

.is-today {
  color: $color-is-today;
}
</style>
