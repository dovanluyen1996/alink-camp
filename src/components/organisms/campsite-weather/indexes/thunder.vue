<template>
  <indexes-base
    :is-purchased="isPurchased"
    title="落雷"
    :image="image"
    :label="label"
  />
</template>

<script>
// components
import IndexesBase from '@/components/organisms/campsite-weather/indexes/base';

export default {
  name: 'CampsiteWeatherThunderIndex',
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
      if (!this.forecast || !this.isPurchased) return this.$helpers.getImage('weathers/thunder/thunder_large_none.png');

      const image = this.$helpers.getImage(`weathers/thunder/thunder_large_${this.forecast.thunderIndex}.png`);
      return image || this.$helpers.getImage('weathers/thunder/thunder_large_none.png');
    },
    label() {
      if (!this.forecast) return '';

      return this.forecast.thunderIndex ? this.thunder_text[this.forecast.thunderIndex] : '';
    },
  },
};
</script>
