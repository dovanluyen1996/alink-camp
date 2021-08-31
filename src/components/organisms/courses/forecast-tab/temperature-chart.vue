<template>
  <div class="temperature-chart-container">
    <chart-header
      title="気温（℃）"
      :updated-at="chartUpdatedAt"
      :pointName="pointName"
    />
    <line-chart
      :chart-data="chartData"
      :options="options"
      :height="200"
    />
  </div>
</template>

<script>
import LineChart from '@/components/atoms/chart/line-chart';
import ChartHeader from '@/components/organisms/courses/forecast-tab/forecast-chart-header';

export default {
  name: 'CoursesForecastTabTemperatureChart',
  components: {
    LineChart,
    ChartHeader,
  },
  data() {
    return {
      chartData: {},
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
    course() {
      return this.$store.getters['course/choosenCourse'];
    },
  },
  watch: {
    async course() {
      const forecastMonthlyTemp = await this.getForecastMonthlyTemp();
      if (forecastMonthlyTemp) {
        this.chartUpdatedAt = forecastMonthlyTemp.updatedAt;
        this.pointName = forecastMonthlyTemp.pointName;
        this.fillData(forecastMonthlyTemp.items);
      }
    },
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
    async getForecastMonthlyTemp() {
      if (!this.course.id) return null;

      const forecastMonthlyTemp = await this.$store.dispatch('models/weather/getForecastMonthlyTemp', { course_id: this.course.id });
      return forecastMonthlyTemp;
    },
  },
};
</script>
