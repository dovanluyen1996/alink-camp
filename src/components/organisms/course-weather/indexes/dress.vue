<template>
  <div class="dress">
    <div class="dress-title">
      服装
    </div>
    <img
      :src="image"
      width="26px"
    >
    <div class="dress-label">
      {{ label }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseWeatherDressIndex',
  props: {
    forecast: {
      type: Object,
      default: null,
      required: true,
    },
  },
  computed: {
    image() {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      return require(`@/assets/images/weathers/dress/dress_large_${this.forecast.dress_index_weather}_${this.forecast.dress_index}.png`);
    },
    label() {
      // TODO: 文言確認する,画像と対応させる
      let text = '';
      switch(this.forecast.dress_index) {
        case 1:
          text = this.forecast.dress_index_weather === 'rain' ? '急な雨に備えて' : '着脱可能な服';
          break;
        case 2:
          text = this.forecast.dress_index_weather === 'rain' ? '急な雨に備えて' : '上着が重宝';
          break;
        case 3:
          text = this.forecast.dress_index_weather === 'rain' ? '急な雨に備えて' : 'しっかり保温';
          break;
        case 4:
          text = this.forecast.dress_index_weather === 'rain' ? '雨具の下は暖かく' : '厳重に防寒を';
          break;
        case 5:
          text = this.forecast.dress_index_weather === 'rain' ? '冬山の装備を' : '冬山の装備を';
          break;
        default:
          text = '';
      }
      return text;
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_mixins.scss';
@import '@/assets/scss/_variables.scss';

.dress-title {
  @include title-style;

  font-size: $font-size-small;
}

.dress-label {
  font-size: $font-size-small;
}
</style>
