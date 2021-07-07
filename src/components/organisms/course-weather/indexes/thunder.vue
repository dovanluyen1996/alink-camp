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
  data() {
    return {
      thunder_text: {
        1: '低い',
        2: 'やや低い',
        3: 'やや高い',
        4: '高い',
      },
    };
  },
  computed: {
    image() {
      return this.$helpers.getImage(`weathers/thunder/thunder_large_${this.getImageFileName()}.png`);
    },
    label() {
      return this.forecast.thunder_index ? this.thunder_text[this.forecast.thunder_index] : '';
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
