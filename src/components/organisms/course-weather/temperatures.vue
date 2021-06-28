<template>
  <div class="course-weather-temperatures">
    <div class="temperature-high">
      最高
      <temperature-component
        :value="high"
        :font-size="fontSize"
      />
    </div>
    <div class="temperature-low">
      最低
      <temperature-component
        :value="low"
        :font-size="fontSize"
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
    // TODO: high, lowは天気APIと合わせてください
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
    fontSize: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.course-weather-temperatures {
  white-space: nowrap;
}

.temperature-high {
  color: $color-temperature-high;
}

.temperature-low {
  color: $color-temperature-low;
}
</style>
