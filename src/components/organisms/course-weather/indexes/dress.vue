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
  name: 'CourseWeatherDress',
  props: {
    value: {
      type: Number,
      default: null,
      required: true,
    },
  },
  computed: {
    isRainy() {
      // TODO: 雨の日判定を入れてください
      return false;
    },
    image() {
      const weather = this.isRainy ? 'rain' : 'fine';
      // eslint-disable-next-line global-require, import/no-dynamic-require
      return require(`@/assets/images/weathers/dress/dress_large_${weather}_${this.value}.png`);
    },
    label() {
      // TODO: 画像と対応させてください
      return '冬山の準備を';
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
