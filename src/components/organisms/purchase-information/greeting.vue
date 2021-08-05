<template>
  <div class="greeting">
    <div class="greeting__title">
      <img
        :src="require('@/assets/images/purchase-information/icon-with-text.png')"
        width="188px"
      >
      <p>天気を把握して、コース予約や準備に</p>
    </div>
    <div class="greeting__content">
      <img
        :src="require('@/assets/images/purchase-information/medal.png')"
        width="41%"
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
  &__title {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    height: 98px;
    padding: 0 12px;
    color: #fff;
    background-color: $color-green;

    p {
      margin-top: 10px;
      margin-bottom: 0;
      font-size: 16px;
      font-weight: 300;
    }
  }

  &__content {
    display: flex;
    flex-flow: column;
    align-items: center;
    text-align: center;
    background-image: url('~@/assets/images/purchase-information/background-purchase.png');
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: 100% 100%;

    img {
      padding: 70px 0;
    }

    /deep/ {
      .button[class*="button--rounded"] {
        height: 44px;
        padding: 0 20px;
        margin-bottom: 35px;
        font-size: 20px;
        font-weight: 600;
        line-height: 2;
        color: #fff;
        background-color: $color-orange;
        border: 2px solid #fff;
        border-radius: 30px;
      }
    }
  }
}
</style>
