<template>
  <div class="course-weather-temperatures">
    <div class="temperature-high">
      <span class="temperature-label">
        最高
      </span>
      <temperature-component
        :value="high"
        :font-size="fontSize"
      />
    </div>
    <div class="temperature-low">
      <span class="temperature-label">
        最低
      </span>
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

.temperature-label {
  margin-right: 3px;
  font-size: $font-size-small;
}

.temperature-high {
  color: $color-temperature-high;
}

.temperature-low {
  color: $color-temperature-low;
}
</style>
