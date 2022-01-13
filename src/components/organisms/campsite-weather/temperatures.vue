<template>
  <div class="campsite-weather-temperatures">
    <div class="temperature-high">
      <span class="temperature-label">
        最高
      </span>
      <temperature-component
        :value="forecast ? forecast.maxTemp : ''"
        :font-size="fontSize"
      />
    </div>
    <div class="temperature-low">
      <span class="temperature-label">
        最低
      </span>
      <temperature-component
        :value="forecast ? forecast.minTemp : ''"
        :font-size="fontSize"
      />
    </div>
  </div>
</template>

<script>
import TemperatureComponent from '@/components/atoms/temperature';

export default {
  name: 'CampsiteWeatherTemperatures',
  components: {
    TemperatureComponent,
  },
  props: {
    forecast: {
      type: Object,
      required: true,
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

.campsite-weather-temperatures {
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
