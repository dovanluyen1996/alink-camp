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
  name: 'CampsiteWeatherDressIndex',
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
