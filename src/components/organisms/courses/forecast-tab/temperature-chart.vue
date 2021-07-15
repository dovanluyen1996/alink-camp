<template>
  <div class="temperature-chart-container">
    <line-chart
      :chart-data="chartData"
      :options="options"
      :height="200"
    />
  </div>
</template>

<script>
import LineChart from '@/components/atoms/chart/line-chart';

export default {
  name: 'CoursesForecastTabTemperatureChart',
  components: {
    LineChart,
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
        this.$emit('update:chartDataUpdatedAt', forecastMonthlyTemp.updatedAt);
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
            label: 'last year',
            borderColor: '#2693CC',
            fill: false,
            data: this.getLastYearTemp(data),
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
    getLastYearTemp(data) {
      return data.map(item => item.lastYear);
    },
    getAverageTemp(data) {
      return data.map(item => item.average);
    },
    getForecastMonthlyTemp() {
      if (!this.course.id) return null;

      return this.$store.dispatch('models/weather/getForecastMonthlyTemp', { course_id: this.course.id });
    },
  },
};
</script>
