<template>
  <div class="fourteen-days-weather">
    <div class="card__title card__title--center">
      14日間の天気
    </div>

    <div class="custom-table">
      <slot name="switcher" />

      <template v-if="$helpers.isPresentObject(forecasts)">
        <sticky-table class="fourteen-days-weather-table">
          <date-row :forecast-data="forecasts" />
          <weather-row :weathers="forecasts" />
          <temperature-row
            :forecast-data="forecasts"
            :is-highest="true"
          />
          <temperature-row
            :forecast-data="forecasts"
            :is-lowest="true"
          />
          <prob-precip-row
            :prob-precips="precips"
            :is-show-fourteen-days="true"
          />
          <wind-direction-row :wind-directions="windDirections" />
          <wind-speed-row :wind-speeds="windSpeeds" />
          <template v-if="isPurchased">
            <thunder-row :thunders="thunders" />
            <dress-row :dresses="dresses" />
            <star-row :stars="stars" />
            <uv-row :uvs="uvs" />
          </template>
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
import DateRow from '@/components/organisms/weather-table/date-row';
import WeatherRow from '@/components/organisms/weather-table/weather-row';
import ProbPrecipRow from '@/components/organisms/weather-table/prob-precip-row';
import TemperatureRow from '@/components/organisms/weather-table/temperature-row';
import WindDirectionRow from '@/components/organisms/weather-table/wind-direction-row';
import WindSpeedRow from '@/components/organisms/weather-table/wind-speed-row';
import ThunderRow from '@/components/organisms/weather-table/thunder-row';
import DressRow from '@/components/organisms/weather-table/dress-row';
import StarRow from '@/components/organisms/weather-table/star-row';
import UvRow from '@/components/organisms/weather-table/uv-row';

export default {
  name: 'CampsitesForecastTabHourlyWeather',
  components: {
    StickyTable,
    DateRow,
    WeatherRow,
    ProbPrecipRow,
    TemperatureRow,
    WindDirectionRow,
    WindSpeedRow,
    ThunderRow,
    DressRow,
    StarRow,
    UvRow,
  },
  data() {
    return {
      forecasts: [],
    };
  },
  computed: {
    campsite() {
      return this.$store.getters['campsite/choosenCampsite'];
    },
    nearestPlan() {
      const futurePlans = this.$store.getters['models/userCampsitePlan/inFuture']({ campsiteId: this.campsite.id });
      const sortPlans = [...futurePlans].sort(
        (a, b) => moment(a.startedDate).diff(b.startedDate),
      );
      return sortPlans[0] || null;
    },
    windDirections() {
      return this.forecasts ? this.forecasts.map(item => item.windDirection) : [];
    },
    windSpeeds() {
      return this.forecasts ? this.forecasts.map(item => item.windSpeed) : [];
    },
    precips() {
      return this.forecasts ? this.forecasts.map(item => item.precip) : [];
    },
    thunders() {
      return this.forecasts ? this.forecasts.map(item => item.thunderIndex) : [];
    },
    dresses() {
      return this.forecasts ? this.forecasts.map(item => item.dressImageName) : [];
    },
    uvs() {
      return this.forecasts ? this.forecasts.map(item => item.uvIndex) : [];
    },
    stars() {
      return this.forecasts ? this.forecasts.map(item => item.starImageName) : [];
    },
    isPurchased() {
      return this.$store.getters['purchase/isPurchased'];
    },
  },
  watch: {
    async campsite() {
      const forecast14Days = await this.getForecast14Days();
      this.forecasts = forecast14Days.items;
    },
  },
  async created() {
    const forecast14Days = await this.getForecast14Days();
    this.forecasts = forecast14Days.items;
  },
  updated() {
    this.$nextTick(() => {
      this.tableScrollPlans();
    });
  },
  methods: {
    tableScrollPlans() {
      // NOTE: セルのdate-day属性に時刻を入れてスクロール位置を取得している
      const table = this.$el.querySelector('.fourteen-days-weather-table');
      if (!table) return;

      if (!this.nearestPlan) return;

      const dateRow = table.querySelector('.date-row');
      const th = dateRow.querySelector('th');

      const plansCol = dateRow.querySelector(`[date-day="${this.nearestPlan.startedDate}"]`);
      if (!plansCol) return;
      // NOTE: border がrightからleftに変わったため、その分xを1ずらす
      const x = plansCol.offsetLeft - th.offsetWidth + 1;

      table.scrollTo(x, 0);
    },
    async getForecast14Days() {
      if (!this.campsite.id) return {};

      const forecast14Days = await this.$store.dispatch('models/weather/getForecast14Days', { campsite_id: this.campsite.id });
      return forecast14Days;
    },
  },
};
</script>

<style scoped lang="scss">
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
