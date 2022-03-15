<template>
  <div class="dress">
    <div v-if="isPurchased">
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
    <div v-else>
      <div class="dress-title dress-title--unpaid">
        服装
      </div>
      <img
        src="@/assets/images/weathers/dress/00.png"
        width="26px"
      >
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
    isPurchased: {
      type: Boolean,
      default: false,
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
