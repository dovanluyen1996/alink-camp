<template>
  <div class="user-course-result-chart-container chart-scrollable">
    <div class="chart-legend">
      <ul class="legend">
        <li>
          総打数
          <span class="legend__total-score"></span>
        </li>
        <li>
          内パター数
          <span class="legend__patting-score"></span>
        </li>
      </ul>
    </div>
    <div class="chart-wrapper">
      <bar-chart
        v-if="chartData"
        :chart-data="chartData"
        :scrollable="true"
        :options="options"
        :height="270"
        class="chart-content"
      />
    </div>
    <canvas
      id="fixed-axis"
      height="270"
      width="0"
    />
  </div>
</template>

<script>
import BarChart from '@/components/atoms/chart/bar-chart';

export default {
  name: 'UserCourseResultsSummaryChart',
  components: {
    BarChart,
  },
  props: {
    userCourseResults: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chartData: null,
      options: {
        legend: {
          display: false,
        },
        scales: {
          xAxes: [{
            stacked: true,
            gridLines: {
              color: 'transparent',
            },
            ticks: {
              maxRotation: 90,
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
      const yAxis = data.map(item => this.$moment(item.targetDate).format('MM/DD'));
      for (let i = yAxis.length; i < 8; i += 1) {
        yAxis.push('');
      }
      return yAxis;
    },
    getTotalScores(data) {
      return data.map(item => item.totalScore);
    },
    getPattingScores(data) {
      return data.map(item => item.pattingScore);
    },
  },
};
</script>

<style lang="scss" scoped>
.user-course-result-chart-container {
  position: relative;

  canvas {
    position: absolute;
    top: 20px;
    left: 0;
    padding-bottom: 32px;
    pointer-events: none;
    background-color: #fff;
  }

  .chart-wrapper {
    position: relative;
    overflow-x: scroll;
  }

  .chart-content {
    float: left;
  }

  .chart-legend {
    height: 20px;

    .legend {
      display: flex;
      justify-content: flex-end;
      font-size: 10px;
      list-style: none;

      li {
        display: flex;
        align-items: center;
        padding-left: 10px;
      }

      &__total-score {
        width: 16px;
        height: 10px;
        margin-left: 5px;
        background-color: rgb(126, 201, 103);
      }

      &__patting-score {
        width: 16px;
        height: 10px;
        margin-left: 5px;
        background-color: rgb(67, 149, 237);
      }
    }
  }
}
</style>
