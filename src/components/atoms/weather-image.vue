<template>
  <div class="weather">
    <img
      :src="require(`@/assets/images/weathers/weather/${weatherId}.png`)"
      :alt="getAlt"
      class="weather-image"
    >
    <div
      v-if="isShownName"
      class="weather-name"
    >
      {{ getWeatherName }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherImage',
  props: {
    weatherId: {
      type: Number,
      default: 0,
      required: true,
    },
    isShownName: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getAlt() {
      if (this.isShownName) return null;
      return this.getWeatherName;
    },
    getWeatherName() {
      return '晴れ';
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/scss/_variables.scss';

.weather-name {
  font-size: $font-size-small;
  text-align: center;
}
</style>
