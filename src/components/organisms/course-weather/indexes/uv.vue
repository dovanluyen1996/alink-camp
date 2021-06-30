<template>
  <div class="uv">
    <div class="uv-title">
      紫外線
    </div>
    <img
      :src="image"
      width="26px"
    >
    <div class="uv-label">
      {{ label }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseWeatherUvIndex',
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
      return require(`@/assets/images/weathers/uv/uv_large_${this.forecast.uv_index}.png`);
    },
    label() {
      let text = '';
      switch(this.forecast.uv_index) {
        case 1:
          text = '弱い';
          break;
        case 2:
          text = 'やや強い';
          break;
        case 3:
          text = '強い';
          break;
        case 4:
          text = '非常に強い';
          break;
        case 5:
          text = 'きわめて強い';
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

.uv-title {
  @include title-style;

  font-size: $font-size-small;
}

.uv-label {
  font-size: $font-size-small;
}
</style>
