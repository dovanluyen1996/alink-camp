<template>
  <indexes-base
    :is-purchased="isPurchased"
    title="服装"
    :image="image"
    :label="forecast ? forecast.dressTelop : ''"
  />
</template>

<script>
// components
import IndexesBase from '@/components/organisms/campsite-weather/indexes/base';

export default {
  name: 'CampsiteWeatherDressIndex',
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
      if (!this.forecast || !this.isPurchased) return this.$helpers.getImage('weathers/dress/00.png');

      const image = this.$helpers.getImage(`weathers/dress/${this.forecast.dressImageName}`);
      return image || this.$helpers.getImage('weathers/dress/00.png');
    },
  },
};
</script>
