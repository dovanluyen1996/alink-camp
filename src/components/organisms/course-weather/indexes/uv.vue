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
      required: true,
    },
  },
  data() {
    return {
      uv_text: {
        1: '弱い',
        2: 'やや強い',
        3: '強い',
        4: '非常に強い',
        5: 'きわめて強い',
      },
    };
  },
  computed: {
    image() {
      if (!this.forecast) return this.$helpers.getImage('weathers/uv/uv_large_none.png');

      const image = this.$helpers.getImage(`weathers/uv/uv_large_${this.forecast.uvIndex}.png`);
      return image || this.$helpers.getImage('weathers/uv/uv_large_none.png');
    },
    label() {
      if (!this.forecast) return '';

      return this.forecast.uvIndex ? this.uv_text[this.forecast.uvIndex] : '';
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
