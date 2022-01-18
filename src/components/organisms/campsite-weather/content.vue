<template>
  <v-ons-card
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

      <template v-if="plan && isPresent(ForecastScheduledDate)">
        <campsite-weather-of-the-day :forecast="ForecastScheduledDate" />
        <campsite-weather-the-day-before :forecast="ForecastScheduledDate.dayBefore" />
        <campsite-weather-hourly-weather :forecast="ForecastScheduledDate.targetDate" />
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
  </v-ons-card>
</template>

<script>
import settings from '@/config/settings';

// components
import CampsiteWeatherHeader from '@/components/organisms/campsite-weather/header';
import CampsiteWeatherPlan from '@/components/organisms/campsite-weather/plan';
import CampsiteWeatherOfTheDay from '@/components/organisms/campsite-weather/weather-of-the-day';
import CampsiteWeatherTheDayBefore from '@/components/organisms/campsite-weather/weather-the-day-before';
import CampsiteWeatherHourlyWeather from '@/components/organisms/campsite-weather/hourly-weather';
import CampsiteWeatherCalendar from '@/components/organisms/campsite-weather/calendar';

export default {
  name: 'CampsiteWeatherContent',
  components: {
    CampsiteWeatherHeader,
    CampsiteWeatherPlan,
    CampsiteWeatherOfTheDay,
    CampsiteWeatherTheDayBefore,
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
        camp_id: this.useCampsite.id,
        target_date: this.plan.startedDate,
      };

      const forecasts = await this.$store.dispatch('models/weather/getForecastScheduledDate', params);
      return forecasts;
    },
    async getForecast14Days() {
      const params = {
        camp_id: this.useCampsite.id,
      };

      const forecasts = await this.$store.dispatch('models/weather/getForecast14Days', params);
      return forecasts;
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
.no-forecast {
  margin: 2rem auto 1rem auto;
  text-align: center;
}

.campsite-weather-detail {
  display: flex;
  flex-wrap: wrap;
}

.campsite-weather-plan {
  width: 100%;
}

.campsite-weather-of-the-day {
  width: 100%;
  margin-bottom: 10px;
}

.campsite-weather-the-day-before {
  width: 100%;
  margin-bottom: 10px;
}

.campsite-weather-time-table {
  width: 100%;
}

@media screen and (min-width: 320px) {
  .campsite-weather-of-the-day {
    width: 61%;
  }

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
