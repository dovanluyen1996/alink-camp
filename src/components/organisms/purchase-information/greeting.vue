<template>
  <div class="greeting">
    <div class="greeting__logo">
      <img
        :src="require('@/assets/images/purchase-information/logo.png')"
        width="283px"
        height="107px"
      >
    </div>
    <div class="greeting__title">
      <p>天気を把握して、コース予約や準備に</p>
    </div>
    <div class="greeting__content">
      <img
        :src="require('@/assets/images/purchase-information/medal.png')"
        width="124px"
        height="120px"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'PurchaseGreeting',
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.greeting {
  background-image: url('~@/assets/images/purchase-information/background-purchase.png');
  background-position: center;
  background-size: cover;

  &__logo {
    display: flex;
    justify-content: center;
    padding-top: 17px;
  }

  &__title {
    display: flex;
    justify-content: center;

    p {
      padding: 5px 12px;
      font-size: 16px;
      font-weight: 600;
      color: white;
      background-color: $color-green;
      border: 1px solid white;
    }
  }

  &__content {
    display: flex;
    justify-content: center;

    img {
      padding-top: 20px;
      padding-bottom: 35px;
    }
  }
}
</style>
