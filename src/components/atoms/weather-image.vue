<template>
  <div class="weather">
    <img
      :src="image"
      :alt="alt"
      :width="imageWidth"
      class="weather-image"
    >
    <div
      v-if="isShownName"
      class="weather-name"
    >
      {{ weather.forecast_telop }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherImage',
  props: {
    weather: {
      type: Object,
      required: true,
    },
    isShownName: {
      type: Boolean,
      default: false,
    },
    imageWidth: {
      type: String,
      default: 'auto',
    },
  },
  computed: {
    image() {
      return this.$helpers.getImage(`weathers/weather/${this.weather.weather_image_name}`);
    },
    alt() {
      if (this.isShownName) return null;
      return this.weather.forecast_telop;
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.weather-name {
  font-size: $font-size-small;
  text-align: center;
}
</style>
