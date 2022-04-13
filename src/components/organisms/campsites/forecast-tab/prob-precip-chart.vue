<template>
  <div class="prob-precip-chart-container">
    <chart-header
      title="降水量（mm）"
      :updated-at="chartUpdatedAt"
      :point-name="pointName"
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
import ChartHeader from '@/components/organisms/campsites/forecast-tab/forecast-chart-header';

export default {
  name: 'CampsitesForecastTabProbPrecipChart',
  components: {
    BarChart,
    ChartHeader,
  },
  data() {
    return {
      chartData: {},
      chartUpdatedAt: '',
      pointName: '',
      options: {
        maintainAspectRatio: false,
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 18,
            filter: item => this.legendsShowed(item),
          },
        },
        scales: {
          xAxes: [{
            gridLines: {
              color: 'transparent',
              zeroLineWidth: 0,
            },
            ticks: {
              fontSize: 12,
            },
          }],
          yAxes: [{
            gridLines: {
              lineWidth: 2,
              tickMarkLength: 20,
              drawBorder: false,
            },
            ticks: {
              min: 0,
              max: 150,
              stepSize: 50,
              padding: 10,
              fontSize: 12,
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
      const forecastMonthlyPrecip = await this.getForecastMonthlyPrecip();
      if (forecastMonthlyPrecip) {
        this.chartUpdatedAt = forecastMonthlyPrecip.updatedAt;
        this.pointName = forecastMonthlyPrecip.pointName;
        this.fillData(forecastMonthlyPrecip.items);
      }
    },
  },
  methods: {
    fillData(data) {
      if (!data) return;

      this.chartData = {
        labels: this.getYAxis(data),
        datasets: [
          {
            label: '予測値',
            backgroundColor: '#4654F7',
            fill: false,
            data: this.getThisYearPrecip(data),
          },
          {
            label: '平年値',
            backgroundColor: '#BCCFDF',
            fill: false,
            data: this.getAveragePrecip(data),
          },
        ],
      };
    },
    legendsShowed(item) {
      return !item.text.includes('last year');
    },
    getYAxis(data) {
      return data.map((item) => {
        const from = this.$moment(item.dateFrom).format('M/D');
        const to = this.$moment(item.dateTo).format('D');

        return `${from}〜${to}`;
      });
    },
    getThisYearPrecip(data) {
      return data.map(item => item.thisYear);
    },
    getAveragePrecip(data) {
      return data.map(item => item.average);
    },
    async getForecastMonthlyPrecip() {
      if (!this.campsite.id) return null;

      const forecastMonthlyPrecip = await this.$store.dispatch('models/weather/getForecastMonthlyPrecip', { campsite_id: this.campsite.id });
      return forecastMonthlyPrecip;
    },
  },
};
</script>

<style scoped lang="scss">
.prob-precip-chart-container {
  margin-bottom: 5px;
}

.no-forecast {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
}

.bar-chart {
  height: 160px;
}
</style>
