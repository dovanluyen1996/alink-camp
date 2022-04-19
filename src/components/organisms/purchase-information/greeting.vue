<template>
  <div class="greeting">
    <div class="greeting__subtitle">
      <p>\豊富な機能/</p>
    </div>
    <div class="greeting__title">
      <p>キャンプ天気会員メニュー</p>
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
    p {
      margin: 0;
      font-weight: bold;
      color: $color-purchase-gold;
      text-align: center;
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

    & img {
      overflow: hidden;
    }
  }

  &__box {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}
</style>
