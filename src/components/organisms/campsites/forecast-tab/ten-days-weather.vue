<template>
  <div class="ten-days-weather">
    <div class="card__title card__title--center">
      14日間の天気
    </div>

    <div class="custom-table">
      <slot name="switcher" />

      <template v-if="$helpers.isPresentObject(forecasts)">
        <sticky-table class="ten-days-weather-table">
          <date-row :forecast-data="forecasts" />
          <weather-row :weathers="forecasts" />
          <prob-precip-row
            :prob-precips="precips"
            :is-show-ten-days="true"
          />
          <temperature-row
            :forecast-data="forecasts"
            :is-highest="true"
          />
          <temperature-row
            :forecast-data="forecasts"
            :is-lowest="true"
          />
          <wind-direction-row :wind-directions="windDirections" />
          <wind-speed-row :wind-speeds="windSpeeds" />
          <lightning-row :lightnings="lightnings" />
          <clothes-row :clothes="clothes" />
          <starry-sky-row :starry-skies="starrySkies" />
          <ultra-ray-row :ultra-rays="ultraRays" />
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
// components
import StickyTable from '@/components/organisms/sticky-table';
import DateRow from '@/components/organisms/weather-table/date-row';
import WeatherRow from '@/components/organisms/weather-table/weather-row';
import ProbPrecipRow from '@/components/organisms/weather-table/prob-precip-row';
import TemperatureRow from '@/components/organisms/weather-table/temperature-row';
import WindDirectionRow from '@/components/organisms/weather-table/wind-direction-row';
import WindSpeedRow from '@/components/organisms/weather-table/wind-speed-row';
import LightningRow from '@/components/organisms/weather-table/lightning-row';
import ClothesRow from '@/components/organisms/weather-table/clothes-row';
import StarrySkyRow from '@/components/organisms/weather-table/starry-sky-row';
import UltraRayRow from '@/components/organisms/weather-table/ultra-ray-row';

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
    LightningRow,
    ClothesRow,
    StarrySkyRow,
    UltraRayRow,
  },
  data() {
    return {
      forecasts: [
        {
          date: '2022-01-20',
          forecastTelop: '雨',
          maxTemp: '7',
          minTemp: '6',
          precip: '80',
          weatherImageName: '15.png',
          windDirection: '北北西',
          windSpeed: 7,
          lightning: true,
          clothe: true,
          starrySky: true,
          ultraRay: true,
        },
        {
          date: '2022-01-21',
          forecastTelop: '雨',
          maxTemp: '10',
          minTemp: '6',
          precip: '80',
          weatherImageName: '15.png',
          windDirection: '北北西',
          windSpeed: 7,
          lightning: true,
          clothe: true,
          starrySky: true,
          ultraRay: true,
        },
        {
          date: '2022-01-22',
          forecastTelop: '雨',
          maxTemp: '17',
          minTemp: '10',
          precip: '80',
          weatherImageName: '15.png',
          windDirection: '北北西',
          windSpeed: 7,
          lightning: true,
          clothe: true,
          starrySky: true,
          ultraRay: true,
        },
        {
          date: '2022-01-23',
          forecastTelop: '雨',
          maxTemp: '8',
          minTemp: '3',
          precip: '80',
          weatherImageName: '15.png',
          windDirection: '北北西',
          windSpeed: 7,
          lightning: true,
          clothe: true,
          starrySky: true,
          ultraRay: true,
        },
        {
          date: '2022-01-24',
          forecastTelop: '雨',
          maxTemp: '6',
          minTemp: '1',
          precip: '80',
          weatherImageName: '15.png',
          windDirection: '北北西',
          windSpeed: 7,
          lightning: true,
          clothe: true,
          starrySky: true,
          ultraRay: true,
        },
        {
          date: '2022-01-25',
          forecastTelop: '雨',
          maxTemp: '17',
          minTemp: '16',
          precip: '20',
          weatherImageName: '15.png',
          windDirection: '北北西',
          windSpeed: 7,
          lightning: true,
          clothe: true,
          starrySky: true,
          ultraRay: true,
        },
      ],
    };
  },
  computed: {
    campsites() {
      // TODO: Handle campsite choosen
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
    lightnings() {
      return this.forecasts ? this.forecasts.map(item => item.lightning) : [];
    },
    clothes() {
      return this.forecasts ? this.forecasts.map(item => item.clothe) : [];
    },
    ultraRays() {
      return this.forecasts ? this.forecasts.map(item => item.ultraRay) : [];
    },
    starrySkies() {
      return this.forecasts ? this.forecasts.map(item => item.starrySky) : [];
    },
  },
  async created() {
    // const forecast10Days = await this.getForecast10Days();
    // this.forecasts = forecast10Days.items;
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
  font-size: 8px;
  line-height: 14px;
}
</style>
