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
      required: true,
    },
    weatherName: {
      type: String,
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
      return this.getImage();
    },
    alt() {
      if (this.isShownName) return null;
      return this.weatherName;
    },
  },
  methods: {
    getImage() {
      try {
        // NOTE: 画像のため依存関係が明らかなのでrequireのルールを除外
        //       枚数も多いので従うと却って見づらくなる
        // eslint-disable-next-line global-require, import/no-dynamic-require
        return require(`@/assets/images/weathers/weather/${this.weatherImageName}`);
      } catch (e) {
        console.error(`天気画像ファイル（@/assets/images/weathers/weather/${this.weatherImageName}）の読み込みに失敗しました`);
        return null;
      }
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
