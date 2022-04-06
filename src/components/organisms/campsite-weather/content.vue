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

      <template v-if="plan && isPresent(ForecastScheduledDate)">
        <campsite-weather-of-the-day :forecast="ForecastScheduledDate" />
        <campsite-weather-hourly-weather :forecast="ForecastScheduledDate.targetDate" />
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

// pages
import CampsiteSearchIndexPage from '@/views/campsite-search/index';
import CampsiteShowPage from '@/views/campsites/show';

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
      this.$store.commit('campsiteSearchNavigator/setEnableBusy', false);
      this.$store.commit('appTabbar/setActiveIndex', settings.views.appTabbar.tabIndexes.campsiteSearch);
      this.$store.dispatch('campsiteSearchNavigator/reset', CampsiteSearchIndexPage);

      this.$store.dispatch('campsiteSearchNavigator/push', {
        extends: CampsiteShowPage,
        onsNavigatorProps: {
          campsite: this.useCampsite,
        },
        onsNavigatorOptions: {
          callback: () => {
            this.$store.commit('campsiteSearchNavigator/setEnableBusy', true);
          },
        },
      });
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
  margin: 10px 20px;
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
  background-color: #fff;
}

/deep/ {
  .card {
    padding: 0;
    border-radius: 0;
  }

  .temperature__unit {
    margin-left: 0;
    font-weight: 300;
  }

  .campsite-weather-day:last-child {
    border-right: 1px solid #d9d9d9;
  }
}

@media screen and (max-width: 374px) {
  .campsite-weather-detail {
    // NOTE: iphone5/SEで予定日表示が収まらないので調整
    margin: 10px;
  }
}
</style>
