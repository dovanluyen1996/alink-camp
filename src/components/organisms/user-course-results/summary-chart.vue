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
    <div
      id="score-summary-chart"
      class="chart-wrapper"
    >
      <bar-chart
        v-if="chartData"
        :key="chartKey"
        :chart-data="chartData"
        :scrollable="true"
        :options="options"
        :height="270"
        :width="chartWidth"
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
      xAxisStepSize: 56,
      chartWidth: 800,
      blankLabel: 0,
      chartKey: 0,
      options: {
        responsive: false,
        legend: {
          display: false,
        },
        tooltips: {
          xAlign: 'left',
        },
        layout: {
          padding: {
            right: 0,
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
      this.chartKey += 1;
      this.calChartWidth();
      this.fillData(this.userCourseResults);
    },
  },
  methods: {
    fillData(data) {
      this.chartData = {
        labels: this.getXAxis(data),
        datasets: [
          {
            label: '内パター数',
            backgroundColor: '#7ec967',
            maxBarThickness: 14,
            data: this.getPattingScores(data),
          },
          {
            label: '総打数',
            backgroundColor: '#4395ed',
            maxBarThickness: 14,
            data: this.getTotalScores(data),
          },
        ],
      };
    },
    getXAxis(data) {
      const xAxis = data.map(item => this.$moment(item.targetDate).format('MM/DD'));
      for (let i = xAxis.length; i <= this.blankLabel; i += 1) {
        xAxis.push('');
      }
      return xAxis;
    },
    getTotalScores(data) {
      return data.map(item => item.totalScore);
    },
    getPattingScores(data) {
      return data.map(item => item.pattingScore);
    },
    calChartWidth() {
      const chartElement = document.getElementById('score-summary-chart');
      const chartWrapWidth = chartElement.offsetWidth || parseInt(chartElement.dataset.width, 10);
      let chartWidth = this.userCourseResults.length * this.xAxisStepSize;

      // assign data-width for chart's element
      if (chartElement.offsetWidth > 0) {
        chartElement.dataset.width = chartElement.offsetWidth;
      }

      // in case chart's items not enought to fill whole horizontal width,
      //   add blank items to make sure chart's items always align left
      const yAxisWidth = 32;
      if (chartWidth < chartWrapWidth) {
        this.blankLabel = Math.floor((chartWrapWidth - yAxisWidth) / this.xAxisStepSize);
        chartWidth += (chartWrapWidth - chartWidth);
      }

      // add more space at the right of chart for tooltip displaying
      const extendSpace = 110;
      if (chartWrapWidth - (this.userCourseResults.length * this.xAxisStepSize) <= extendSpace) {
        this.chartWidth = chartWidth + extendSpace;
        this.options.layout.padding.right = extendSpace;
      } else {
        this.options.layout.padding.right = 0;
        this.chartWidth = chartWidth;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.user-course-result-chart-container {
  position: relative;
  padding-left: 40px;

  canvas {
    position: absolute;
    top: 20px;
    left: 40px;
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

      &__total-score,
      &__patting-score {
        width: 16px;
        height: 10px;
        margin-left: 5px;
      }

      &__total-score {
        background-color: #4395ed;
      }

      &__patting-score {
        background-color: #7ec967;
      }
    }
  }
}
</style>
