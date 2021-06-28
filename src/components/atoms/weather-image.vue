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
/* TODO: 天気IDと画像ID、nameの表がgoogleDriveにあるので
 *       対応させてください
 *       https://docs.google.com/spreadsheets/d/1fO9nqEEQ6UpgBtVHPDT3hGg-MU4KaUH5/edit#gid=205655122
*/
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
      return require(`@/assets/images/weathers/weather/${this.weatherId}.png`);
    },
    alt() {
      if (this.isShownName) return null;
      return this.weatherName;
    },
    weatherName() {
      return '晴れ';
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
