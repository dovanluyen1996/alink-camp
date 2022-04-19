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
  align-items: center;
  height: 100%;
  line-height: 1;
  white-space: nowrap;
}

.temperature-label {
  margin-right: 3px;
  font-size: 11px;
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
  align-items: center;
  justify-content: center;
  width: 90%;
  max-width: 196px;
  height: 21px;
  margin: 8px 0;
  font-size: 10px;
  font-weight: bold;
  color: #f5f2f2;
  background-color: #eb4a18;
  border-radius: 22px;
}
</style>
