<template>
  <indexes-base
    :is-purchased="isPurchased"
    title="星空指数"
    :image="image"
    :label="forecast ? forecast.starTelop : ''"
  />
</template>

<script>
// components
import IndexesBase from '@/components/organisms/campsite-weather/indexes/base';

export default {
  name: 'CampsiteWeatherStarIndex',
  components: {
    IndexesBase,
  },
  props: {
    forecast: {
      type: Object,
      required: true,
    },
    isPurchased: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    image() {
      if (!this.forecast || !this.isPurchased) return this.$helpers.getImage('weathers/star/00.png');

      const image = this.$helpers.getImage(`weathers/star/${this.forecast.starImageName}`);
      return image || this.$helpers.getImage('weathers/star/00.png');
    },
  },
};
</script>
