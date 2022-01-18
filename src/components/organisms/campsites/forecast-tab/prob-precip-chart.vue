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
        :height="160"
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
      chartData: {
        items: [
          {
            average: '100',
            dateFrom: '2022-01-01',
            dateTo: '2022-01-05',
            thisYear: '80',
          },
          {
            average: '120',
            dateFrom: '2022-01-06',
            dateTo: '2022-01-10',
            thisYear: '90',
          },
          {
            average: '130',
            dateFrom: '2022-01-11',
            dateTo: '2022-01-15',
            thisYear: '100',
          },
          {
            average: '150',
            dateFrom: '2022-01-16',
            dateTo: '2022-01-20',
            thisYear: '120',
          },
          {
            average: '140',
            dateFrom: '2022-01-21',
            dateTo: '2022-01-25',
            thisYear: '150',
          },
        ],
        updatedAt: '2022-01-21 08:00:00',
        pointName: '大田区',
      },
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
    campsites() {
      // TODO: handle campsite choosen
    },
  },
  created() {
    // TODO: All action below will implement in watcher when implement logic

    this.chartUpdatedAt = this.chartData.updatedAt;
    this.pointName = this.chartData.pointName;
    this.fillData(this.chartData.items);
  },
  methods: {
    fillData(data) {
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
  },
};
</script>

<style scoped lang="scss">
.no-forecast {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
}
</style>
