<template>
  <div class="prob-precip-chart-container">
    <bar-chart
      :chart-data="chartData"
      :options="options"
      :height="160"
    />
  </div>
</template>

<script>
import BarChart from '@/components/atoms/chart/bar-chart';

export default {
  name: 'CoursesForecastTabProbPrecipChart',
  components: {
    BarChart,
  },
  props: {
    chartDataUpdatedAt: {
      type: String,
      default: '',
      required: true,
    },
  },
  data() {
    return {
      chartData: {},
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
    course() {
      return this.$store.getters['course/choosenCourse'];
    },
  },
  watch: {
    async course() {
      const forecastMonthlyPrecip = await this.getForecastMonthlyPrecip();
      if (forecastMonthlyPrecip) {
        this.$emit('update:chartDataUpdatedAt', forecastMonthlyPrecip.updatedAt);
        this.fillData(forecastMonthlyPrecip.items);
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
          {
            label: 'last year',
            backgroundColor: '#2693CC',
            fill: false,
            data: this.getLastYearPrecip(data),
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
    getLastYearPrecip(data) {
      return data.map(item => item.lastYear);
    },
    getAveragePrecip(data) {
      return data.map(item => item.average);
    },
    getForecastMonthlyPrecip() {
      if (!this.course.id) return null;

      return this.$store.dispatch('models/weather/getForecastMonthlyPrecip', { course_id: this.course.id });
    },
  },
};
</script>
