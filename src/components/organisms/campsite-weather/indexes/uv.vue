<template>
  <indexes-base
    :is-purchased="isPurchased"
    title="紫外線"
    :image="image"
    :label="label"
  />
</template>

<script>
// components
import IndexesBase from '@/components/organisms/campsite-weather/indexes/base';

export default {
  name: 'CampsiteWeatherUvIndex',
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
      if (!this.forecast || !this.isPurchased) return this.$helpers.getImage('weathers/uv/uv_large_none.png');

      const image = this.$helpers.getImage(`weathers/uv/uv_large_${this.forecast.uvIndex}.png`);
      return image || this.$helpers.getImage('weathers/uv/uv_large_none.png');
    },
    label() {
      if (!this.forecast) return '';

      return this.forecast.uvIndex ? this.uv_text[this.forecast.uvIndex] : '';
    },
  },
};
</script>
