<template>
  <div class="campsite-weather-temperatures">
    <div class="campsite-weather-box">
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
    <div
      v-if="forecast.heatStroke"
      class="temperature-heat-stroke"
    >
      {{ forecast.heatStroke }}
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
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  height: 100%;
  white-space: nowrap;
}

.temperature-label {
  margin-right: 3px;
  font-size: 11px;
  font-weight: 300;
}

.temperature-high {
  color: $color-temperature-high;
}

.temperature-low {
  color: $color-temperature-low;
}

.campsite-weather-box {
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: center;
}

.temperature-heat-stroke {
  display: flex;
  justify-content: center;
  width: 163px;
  height: 11px;
  font-size: 7px;
  font-weight: 600;
  color: #f5f2f2;
  background-color: #eb4a18;
  border-radius: 22px;
}
</style>
