<template>
  <div
    class="campsite-weather-show"
    @click="goToCampsiteDetail"
  >
    <campsite-weather-header
      :campsite="useCampsite"
    />
    <div class="campsite-weather-detail">
      <campsite-weather-plan
        v-if="plan"
        :plan="plan"
      />
      <div class="campsite-weather-separate"></div>

      <template v-if="plan && isPresent(ForecastScheduledDate)">
        <campsite-weather-of-the-day :forecast="ForecastScheduledDate" />
        <campsite-weather-hourly-weather :forecast="ForecastScheduledDate.targetDate" />
        <div class="campsite-weather-separate"></div>
        <campsite-weather-the-day-after :forecast="ForecastScheduledDate.dayAfter" />
      </template>
      <template v-else-if="isPresent(Forecast14Days)">
        <campsite-weather-calendar
          :forecasts="Forecast14Days.items"
        />
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
import settings from '@/config/settings';

// components
import CampsiteWeatherHeader from '@/components/organisms/campsite-weather/header';
import CampsiteWeatherPlan from '@/components/organisms/campsite-weather/plan';
import CampsiteWeatherOfTheDay from '@/components/organisms/campsite-weather/weather-of-the-day';
import CampsiteWeatherTheDayAfter from '@/components/organisms/campsite-weather/weather-the-day-after';
import CampsiteWeatherHourlyWeather from '@/components/organisms/campsite-weather/hourly-weather';
import CampsiteWeatherCalendar from '@/components/organisms/campsite-weather/calendar';

export default {
  name: 'CampsiteWeatherContent',
  components: {
    CampsiteWeatherHeader,
    CampsiteWeatherPlan,
    CampsiteWeatherOfTheDay,
    CampsiteWeatherTheDayAfter,
    CampsiteWeatherHourlyWeather,
    CampsiteWeatherCalendar,
  },
  props: {
    plan: {
      type: Object,
      default: () => {},
    },
    campsite: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      ForecastScheduledDate: null,
      Forecast14Days: null,
    };
  },
  computed: {
    useCampsite() {
      if (!this.plan) return this.campsite;
      return this.plan.campsite;
    },
    activeIndex() {
      return this.$store.state.appTabbar.activeIndex;
    },
  },
  watch: {
    async activeIndex() {
      if (this.activeIndex === settings.views.appTabbar.tabIndexes.campsiteWeather) {
        this.ForecastScheduledDate = await this.getForecastScheduledDate();
        this.Forecast14Days = await this.getForecast14Days();
      }
    },
  },
  async created() {
    this.ForecastScheduledDate = await this.getForecastScheduledDate();
    this.Forecast14Days = await this.getForecast14Days();
  },
  methods: {
    async getForecastScheduledDate() {
      if (!this.plan) return null;
      const params = {
        campsite_id: this.useCampsite.id,
        target_date: this.targetDate(),
      };

      const forecasts = await this.$store.dispatch('models/weather/getForecastScheduledDate', params);
      return forecasts;
    },
    async getForecast14Days() {
      const params = {
        campsite_id: this.useCampsite.id,
      };

      const forecasts = await this.$store.dispatch('models/weather/getForecast14Days', params);
      return forecasts;
    },
    targetDate() {
      return moment().startOf('day').isBetween(this.plan.startedDate, this.plan.finishedDate, null, '[]') ? moment().format('YYYY-MM-DD') : this.plan.startedDate;
    },
    goToCampsiteDetail() {
      // TODO: 詳細のロジック実装時に、ページ遷移を実装する
    },
    isPresent(forecastObject) {
      return this.$helpers.isPresentObject(forecastObject);
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.no-forecast {
  margin: 2rem auto 1rem auto;
  text-align: center;
}

.campsite-weather-detail {
  display: flex;
  flex-wrap: wrap;
  margin: 6px 9px;
}

.campsite-weather-plan {
  width: 100%;
}

.campsite-weather-of-the-day {
  width: 100%;
  background-color: #fff;
}

.campsite-weather-the-day-before {
  width: 100%;
  margin-bottom: 10px;
}

.campsite-weather-time-table {
  width: 100%;
  font-size: 10px;
  font-weight: 300;
  background-color: #fff;
}

.campsite-weather-separate {
  width: 100%;
  height: 6px;
  background-color: transparent;
}

/deep/ {
  .card {
    padding: 0;
    border-radius: 0;
  }

  .temperature__unit {
    margin-left: 0;
  }

  .campsite-weather-day:last-child {
    border-right: 1px solid #d9d9d9;
  }
}

@media screen and (min-width: 320px) {
  .campsite-weather-the-day-before {
    width: 36%;
    margin-left: 3%;
  }
}

@media screen and (min-width: 375px) {
  .campsite-weather-the-day-before {
    width: 32%;
    margin-left: 7%;
  }
}

@media screen and (min-width: 590px) {
  .campsite-weather-of-the-day {
    width: 180px;
    margin-bottom: 0;
  }

  .campsite-weather-the-day-before {
    width: 95px;
    margin-bottom: 0;
    margin-left: 20px;
  }

  .campsite-weather-time-table {
    flex: 1;
    width: auto;
    margin-left: 20px;
  }
}
</style>
