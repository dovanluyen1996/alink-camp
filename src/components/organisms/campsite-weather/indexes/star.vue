<template>
  <div class="star">
    <div class="star-title">
      星空指数
    </div>
    <img
      :src="image"
      width="26px"
    >
    <div class="star-label">
      {{ forecast ? forecast.starTelop : '' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CampsiteWeatherStarIndex',
  props: {
    forecast: {
      type: Object,
      required: true,
    },
  },
  computed: {
    image() {
      if (!this.forecast) return this.$helpers.getImage('weathers/star/00.png');

      const image = this.$helpers.getImage(`weathers/star/${this.forecast.starImageName}`);
      return image || this.$helpers.getImage('weathers/star/00.png');
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_mixins.scss';
@import '@/assets/scss/_variables.scss';

.star-title {
  @include title-style;

  font-size: $font-size-small;
}

.star-label {
  font-size: $font-size-small;
}
</style>
