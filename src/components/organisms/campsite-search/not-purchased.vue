<template>
  <div
    class="not-purchased-box"
  >
    <img
      class="not-purchased-img"
      src="@/assets/images/campsite-search-weather-purchase.png"
      alt="weather-purchase"
      @click="goToPurchaseInformation"
    >
  </div>
</template>

<script>
// pages
import PurchaseInformation from '@/views/purchase-information/index';

export default {
  methods: {
    goToPurchaseInformation() {
      this.$store.dispatch('campsiteSearchNavigator/push', PurchaseInformation);
    },
  },
};
</script>

<style scoped lang="scss">
.not-purchased-box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.not-purchased-img {
  width: 100%;
  background-size: cover;
}

</style>
