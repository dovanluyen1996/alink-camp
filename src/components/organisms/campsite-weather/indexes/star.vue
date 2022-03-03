<template>
  <div class="star">
    <div v-if="isPurchased">
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
    <div v-else>
      <div class="star-title star-title--unpaid">
        星空指数
      </div>
      <img
        src="@/assets/images/weathers/star/00.png"
        width="26px"
      >
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
    isPurchased: {
      type: Boolean,
      default: false,
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
