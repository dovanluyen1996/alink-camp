<template>
  <div class="user-course-result-chart-container">
    <bar-chart
      :chart-data="chartData"
      :options="options"
      :height="270"
    />
  </div>
</template>

<script>
import BarChart from '@/components/atoms/chart/bar-chart';

export default {
  name: 'UserCourseResultsSummaryChart',
  props: {
    userCourseResults: {
      type: Array,
      required: true,
    },
  },
  components: {
    BarChart,
  },
  data() {
    return {
      chartData: {},
      options: {
        legend: {
          align: 'end',
          labels: {
            boxWidth: 16,
            fontSize: 10,
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
          }],
        },
      },
    };
  },
  watch: {
    userCourseResults() {
      this.fillData(this.userCourseResults);
    },
  },
  methods: {
    fillData(data) {
      this.chartData = {
        labels: this.getYAxis(data),
        datasets: [
          {
            label: '内パター数',
            backgroundColor: '#7EC967',
            maxBarThickness: 14,
            data: this.getPattingScores(data),
          },
          {
            label: '総打数',
            backgroundColor: '#4395ED',
            maxBarThickness: 14,
            data: this.getTotalScores(data),
          },
        ],
      };
    },
    getYAxis(data) {
      return data.map(item => this.$moment(item.targetDate).format('MM/DD'));
    },
    getTotalScores(data) {
      return data.map(item => item.totalScore);
    },
    getPattingScores(data) {
      return data.map(item => item.pattingScore);
    }
  }
};
</script>
