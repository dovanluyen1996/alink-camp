<template>
  <div
    class="not-purchased-box"
  >
    <img
      class="not-purchased-img"
      src="@/assets/images/purchase-information/banner-LP.png"
    >
  </div>
</template>

<script>
export default {
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

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
