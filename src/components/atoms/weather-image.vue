<template>
  <div class="weather">
    <img
      :src="image"
      :alt="alt"
      :width="imageWidth"
      class="weather-image"
    >
    <div
      class="weather-name"
    >
      {{ weatherName }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'WeatherImage',
  props: {
    weatherImageName: {
      type: String,
      default: '',
      required: true,
    },
    weatherName: {
      type: String,
      default: '',
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
      // NOTE: 画像のため依存関係が明らかなのでrequireのルールを除外
      //       枚数も多いので従うと却って見づらくなる
      // eslint-disable-next-line global-require, import/no-dynamic-require
      return require(`@/assets/images/weathers/weather/${this.weatherImageName}`);
    },
    alt() {
      if (this.isShownName) return null;
      return this.weatherName;
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
