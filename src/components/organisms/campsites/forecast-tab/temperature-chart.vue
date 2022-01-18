<template>
  <div class="temperature-chart-container">
    <chart-header
      title="気温（℃）"
      :updated-at="chartUpdatedAt"
      :point-name="pointName"
    />

    <template v-if="$helpers.isPresentObject(chartData)">
      <line-chart
        :chart-data="chartData"
        :options="options"
        :height="200"
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
import LineChart from '@/components/atoms/chart/line-chart';
import ChartHeader from '@/components/organisms/campsites/forecast-tab/forecast-chart-header';

export default {
  name: 'CampsitesForecastTabTemperatureChart',
  components: {
    LineChart,
    ChartHeader,
  },
  data() {
    return {
      chartData: {
        items: [
          {
            average: '12.6',
            date: '2022-01-01',
            thisYear: '13.7',
          },
          {
            average: '12.1',
            date: '2022-01-02',
            thisYear: '13.1',
          },
          {
            average: '12',
            date: '2022-01-03',
            thisYear: '13.4',
          },
          {
            average: '11.4',
            date: '2022-01-04',
            thisYear: '12.4',
          },
          {
            average: '10.6',
            date: '2022-01-05',
            thisYear: '19.8',
          },
        ],
        updatedAt: '2022-01-21 08:00:00',
        pointName: '酒田',
      },
      chartUpdatedAt: '',
      pointName: '',
      options: {
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
              zeroLineColor: '#ef3434',
              zeroLineWidth: 2,
            },
            ticks: {
              fontSize: 12,
            },
          }],
          yAxes: [{
            gridLines: {
              lineWidth: 2,
            },
            ticks: {
              stepSize: 10,
              fontSize: 12,
            },
          }],
        },
        elements: {
          point: {
            radius: 0,
          },
        },
      },
    };
  },
  computed: {
    campsites() {
      // TODO: Handle campsite choosen
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
            borderColor: '#4654F7',
            fill: false,
            data: this.getThisYearTemp(data),
          },
          {
            label: '平年値',
            borderColor: '#BCCFDF',
            fill: false,
            data: this.getAverageTemp(data),
          },
        ],
      };
    },
    legendsShowed(item) {
      return !item.text.includes('last year');
    },
    getYAxis(data) {
      return data.map(item => this.$moment(item.date).format('D'));
    },
    getThisYearTemp(data) {
      return data.map(item => item.thisYear);
    },
    getAverageTemp(data) {
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
