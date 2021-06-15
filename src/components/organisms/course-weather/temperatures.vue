<template>
  <div class="course-weather-temperatures">
    <div class="temperature-high">
      最高
      <temperature-component
        :value="high"
        font-size="18px"
      />
    </div>
    <div class="temperature-low">
      最低
      <temperature-component
        :value="low"
        font-size="18px"
      />
    </div>
  </div>
</template>

<script>
import TemperatureComponent from '@/components/atoms/temperature';

export default {
  name: 'CourseWeatherTemperatures',
  components: {
    TemperatureComponent,
  },
  props: {
    high: {
      type: Number,
      default: null,
      require: true,
    },
    low: {
      type: Number,
      default: null,
      require: true,
    },
  },
};
</script>

<style scoped lang="scss">
.course-weather-temperatures {
  font-size: 11px;
  white-space: nowrap;
}

.temperature-high {
  color: #f53939;
}

.temperature-low {
  color: #0097ff;
}
</style>
