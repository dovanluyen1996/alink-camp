<template>
  <div class="annual-weather-container">
    <chart-header
      title="年間の天気傾向"
    />
    <template v-if="$helpers.isPresentObject(chartData)">
      <bar-chart
        :chart-data="chartData"
        :options="options"
        class="bar-chart"
      />
    </template>

    <template v-else>
      <div class="no-forecast">
        表示できる天気情報がありません
      </div>
    </template>
  </div>
</template>

<script>
import BarChart from '@/components/atoms/chart/bar-chart';
import ChartHeader from '@/components/organisms/campsites/forecast-tab/forecast-header';

export default {
  name: 'CampsitesForecastAnnualWeatherChart',
  components: {
    BarChart,
    ChartHeader,
  },
  data() {
    return {
      chartData: {},
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 18,
          },
        },
        scales: {
          xAxes: [{
            stacked: true,
            gridLines: {
              color: 'transparent',
            },
          }],
          yAxes: [{
            stacked: true,
            gridLines: {
              color: 'transparent',
            },
            ticks: {
              min: 0,
              max: 100,
              stepSize: 20,
              callback(value) {
                return `${value}%`;
              },
            },
          }],
        },
      },
    };
  },
  computed: {
    campsite() {
      return this.$store.getters['campsite/choosenCampsite'];
    },
  },
  watch: {
    async campsite() {
      const forecastYearlyWeatherRate = await this.getForecastYearlyWeatherRate();
      const sortItems = forecastYearlyWeatherRate.items.sort(
        (a, b) => parseInt(a.month, 10) - parseInt(b.month, 10),
      );
      if (forecastYearlyWeatherRate) {
        this.fillData(sortItems);
      }
    },
  },
  methods: {
    fillData(data) {
      if (!data) return;

      this.chartData = {
        labels: data.map(datum => `${parseInt(datum.month, 10)}月`),
        datasets: [
          {
            label: '晴',
            backgroundColor: '#EEB432',
            fill: false,
            data: this.getSunnyRate(data),
          },
          {
            label: '曇',
            backgroundColor: '#BCB9AE',
            fill: false,
            data: this.getCloudyRate(data),
          },
          {
            label: '雨',
            backgroundColor: '#327AEE',
            fill: false,
            data: this.getRainRate(data),
          },
          {
            label: '雪',
            backgroundColor: '#F9F9F9',
            fill: false,
            data: this.getSnowRate(data),
          },
          {
            label: '不明',
            backgroundColor: '#000304',
            fill: false,
            data: this.getUnknownRate(data),
          },
        ],
      };
    },
    getSunnyRate(data) {
      return data.map(item => item.weatherRate.sunny);
    },
    getCloudyRate(data) {
      return data.map(item => item.weatherRate.cloudy);
    },
    getRainRate(data) {
      return data.map(item => item.weatherRate.rain);
    },
    getSnowRate(data) {
      return data.map(item => item.weatherRate.snow);
    },
    getUnknownRate(data) {
      return data.map(item => item.weatherRate.unknown);
    },
    async getForecastYearlyWeatherRate() {
      if (!this.campsite.id) return null;

      const forecastYearlyWeatherRate = await this.$store.dispatch('models/weather/getForecastYearlyWeatherRate', { campsite_id: this.campsite.id });
      return forecastYearlyWeatherRate;
    },
  },
};
</script>

<style scoped lang="scss">
.annual-weather-container {
  margin-bottom: 5px;
}

.image-temp {
  width: 100%;
}

.no-forecast {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
}

.bar-chart {
  height: 250px;
}
</style>
