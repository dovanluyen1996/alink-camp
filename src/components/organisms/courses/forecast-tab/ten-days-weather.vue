<template>
  <div class="ten-days-weather">
    <div class="card__title card__title--center">
      10日間の天気
    </div>

    <slot name="switcher" />

    <sticky-table class="ten-days-weather-table">
      <date-row :forecast-data="forecasts" />
      <weather-row :forecast-data="forecasts" />
      <prob-precip-row :forecast-data="forecasts" />
      <temperature-row
        :forecast-data="forecasts"
        :is-highest="true"
      />
      <temperature-row
        :forecast-data="forecasts"
        :is-lowest="true"
      />
      <wind-direction-row :forecast-data="forecasts" />
      <wind-speed-row :forecast-data="forecasts" />
    </sticky-table>
  </div>
</template>

<script>
// components
import StickyTable from '@/components/organisms/sticky-table';
import DateRow from '@/components/organisms/weather-table/date-row';
import WeatherRow from '@/components/organisms/weather-table/weather-row';
import ProbPrecipRow from '@/components/organisms/weather-table/prob-precip-row';
import TemperatureRow from '@/components/organisms/weather-table/temperature-row';
import WindDirectionRow from '@/components/organisms/weather-table/wind-direction-row';
import WindSpeedRow from '@/components/organisms/weather-table/wind-speed-row';

export default {
  name: 'CoursesForecastTabHourlyWeather',
  components: {
    StickyTable,
    DateRow,
    WeatherRow,
    ProbPrecipRow,
    TemperatureRow,
    WindDirectionRow,
    WindSpeedRow,
  },
  data() {
    return {
      forecasts: [],
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
      return (this.userCourse && this.userCourse.userCoursePlans[0]) || {};
    },
  },
  watch: {
    async course() {
      const forecast10Days = await this.getForecast10Days();
      this.forecasts = forecast10Days.items;
    },
  },
  async created() {
    const forecast10Days = await this.getForecast10Days();
    this.forecasts = forecast10Days.items;
  },
  updated() {
    this.$nextTick(() => {
      this.tableScrollPlans();
    });
  },
  methods: {
    tableScrollPlans() {
      // NOTE: セルのdate-day属性に時刻を入れてスクロール位置を取得している
      const table = this.$el.querySelector('.ten-days-weather-table');
      const dateRow = table.querySelector('.date-row');
      const th = dateRow.querySelector('th');
      const plans = this.userCoursePlan.targetDate || this.$moment().format('YYYY-MM-DD');
      const plansCol = dateRow.querySelector(`[date-day="${plans}"]`);
      if (!plansCol) return;
      const x = plansCol.offsetLeft - th.offsetWidth;

      table.scrollTo(x, 0);
    },
    async getForecast10Days() {
      if (!this.course.id) return {};

      const forecast10Days = await this.$store.dispatch('models/weather/getForecast10Days', { course_id: this.course.id });
      return forecast10Days;
    },
  },
};
</script>

<style scoped lang="scss">
/deep/ {
  .table {
    text-align: center;
  }

  .th {
    white-space: nowrap;
  }
}
</style>
