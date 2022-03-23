<template>
  <div class="greeting">
    <div class="greeting__subtitle">
      <p>\豊富なプレミア会員機能/</p>
    </div>
    <div class="greeting__title">
      <p>プレミア会員メニュー</p>
    </div>
    <div class="greeting__content">
      <img
        src="@/assets/images/purchase-information/logo.png"
        width="344px"
        height="138px"
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
  background-color: #f2ebd3;
  background-position: center;
  background-size: cover;

  &__title,
  &__subtitle {
    display: flex;
    justify-content: center;

    p {
      margin: 0;
      font-weight: 600;
      color: $color-purchase-gold;
    }
  }

  &__title {
    padding: 18px 0 16px 0;

    & > p {
      font-size: 28px;
    }
  }

  &__subtitle {
    padding-top: 23px;

    & p {
      font-size: 20px;
    }
  }

  &__content {
    display: flex;
    justify-content: center;
    padding: 0 20px;
  }

  &__box {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}
</style>
