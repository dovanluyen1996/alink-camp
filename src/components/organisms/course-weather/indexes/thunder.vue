<template>
  <div class="thunder">
    <div class="thunder-title">
      落雷
    </div>
    <img
      :src="image"
      width="26px"
    >
    <div class="thunder-label">
      {{ label }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseWeatherThunderIndex',
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
      return require(`@/assets/images/weathers/thunder/thunder_large_${this.value}.png`);
    },
    label() {
      // TODO: 画像と対応させてください
      return '弱い';
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_mixins.scss';
@import '@/assets/scss/_variables.scss';

.thunder-title {
  @include title-style;

  font-size: $font-size-small;
}

.thunder-label {
  font-size: $font-size-small;
}
</style>
