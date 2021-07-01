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
      return this.getImage();
    },
    label() {
      return this.forecast.uv_index ? this.uv_text[this.forecast.uv_index] : '';
    },
  },
  methods: {
    getImage() {
      try {
        // eslint-disable-next-line global-require, import/no-dynamic-require
        return require(`@/assets/images/weathers/uv/uv_large_${this.getImageFileName()}.png`);
      } catch (e) {
        console.error(`紫外線画像ファイル（@/assets/images/weathers/uv/uv_large_${this.getImageFileName()}.png）の読み込みに失敗しました`);
        return null;
      }
    },
    getImageFileName() {
      return this.forecast.uv_index || 'none';
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
