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
      {{ forecast ? forecast.dressTelop : '' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseWeatherDressIndex',
  props: {
    forecast: {
      type: Object,
      required: true,
    },
  },
  computed: {
    image() {
      if (!this.forecast) return this.$helpers.getImage('weathers/dress/00.png');

      const image = this.$helpers.getImage(`weathers/dress/${this.forecast.dressImageName}`);
      return image || this.$helpers.getImage('weathers/dress/00.png');
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
