<script>
/* eslint-disable no-underscore-dangle */
import { Bar, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    options: {
      type: Object,
      default: null,
    },
    scrollable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      rectangleSet: false,
    };
  },
  watch: {
    chartData() {
      this.rectangleSet = false;
      this.adjustAxisRotationDeg(this.$data._chart);
    },
  },
  mounted() {
    const options = { ...this.options };

    if (this.scrollable) {
      options.animation = {
        onComplete: this.onComplete,
        onProgress: this.onProgress,
      };
    }
    this.renderChart(this.chartData, options);
    this.adjustAxisRotationDeg(this.$data._chart);
  },
  methods: {
    onComplete(event) {
      if (!this.rectangleSet) {
        const scale = window.devicePixelRatio;

        const sourceCanvas = event.chart.canvas;
        const copyWidth = event.chart.scales['y-axis-0'].width + 2;
        const copyHeight = event.chart.scales['y-axis-0'].height + event.chart.scales['y-axis-0'].top + 10;

        const targetCtx = document.getElementById('fixed-axis').getContext('2d');
        targetCtx.scale(scale, scale);
        targetCtx.canvas.width = copyWidth * scale;
        targetCtx.canvas.height = copyHeight * scale;
        targetCtx.canvas.style.width = `${copyWidth}px`;
        targetCtx.canvas.style.height = `${copyHeight}px`;
        targetCtx.drawImage(
          sourceCanvas, 0, 0,
          copyWidth * scale,
          copyHeight * scale, 0, 0,
          copyWidth * scale,
          copyHeight * scale,
        );

        const sourceCtx = sourceCanvas.getContext('2d');
        sourceCtx.clearRect(0, 0, copyWidth - 2, copyHeight);

        this.rectangleSet = true;
      }
    },
    onProgress(event) {
      if (this.rectangleSet) {
        const copyWidth = event.chart.scales['y-axis-0'].width + 5;
        const copyHeight = event.chart.scales['y-axis-0'].height + event.chart.scales['y-axis-0'].top + 10;

        const sourceCtx = event.chart.canvas.getContext('2d');
        sourceCtx.clearRect(0, 0, copyWidth, copyHeight);
      }
    },
    adjustAxisRotationDeg(chart) {
      if (!this.scrollable) return;

      const rotateDeg = this.chartData.labels.length >= 10 ? 90 : 0;
      chart.options.scales.xAxes[0].ticks.minRotation = rotateDeg;
      chart.update();
    },
  },
};
/* eslint-enable no-underscore-dangle */
</script>
