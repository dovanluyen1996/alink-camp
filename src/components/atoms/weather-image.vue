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
      {{ weather ? weather.forecastTelop : '' }}
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
      if (!this.weather) return this.$helpers.getImage('weathers/weather/00.png');

      const image = this.$helpers.getImage(`weathers/weather/${this.weather.weatherImageName}`);
      return image || this.$helpers.getImage('weathers/weather/00.png');
    },
    alt() {
      if (!this.weather) return null;
      return (this.isShownName) ? null : this.weather.forecastTelop;
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
