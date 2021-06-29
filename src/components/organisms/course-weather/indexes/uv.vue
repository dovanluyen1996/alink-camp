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
    value: {
      type: Number,
      default: null,
      required: true,
    },
  },
  computed: {
    image() {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      return require(`@/assets/images/weathers/uv/uv_large_${this.value}.png`);
    },
    label() {
      // TODO: 文言確認する,画像と対応させる
      return '弱い';
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
