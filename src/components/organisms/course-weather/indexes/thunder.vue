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
    forecast: {
      type: Object,
      default: null,
      required: true,
    },
  },
  computed: {
    image() {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      return require(`@/assets/images/weathers/thunder/thunder_large_${this.getImageFileName()}.png`);
    },
    label() {
      // TODO: 文言確認する,画像と対応させる
      let text = '';
      switch (this.forecast.thunder_index) {
      case 1:
        text = '低い';
        break;
      case 2:
        text = 'やや低い';
        break;
      case 3:
        text = 'やや高い';
        break;
      case 4:
        text = '高い';
        break;
      default:
        text = '';
      }
      return text;
    },
  },
  methods: {
    getImageFileName() {
      return this.forecast.thunder_index || 'none';
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
