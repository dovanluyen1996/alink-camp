<template>
  <div class="purchase-point">
    <div class="purchase-point__title">
      <img
        :src="require('@/assets/images/purchase-information/crown-icon.png')"
        alt="purchase-point"
        width="28px"
        height="22px"
      >
      <p>
        <slot name="title" />
      </p>
    </div>
    <div
      class="purchase-point__content"
      :class="{ 'purchase-point__content--full-width': contentFullWidth }"
    >
      <div class="purchase-point__description">
        <slot />
      </div>
      <div class="purchase-point__thumbnal">
        <slot name="thumbnail" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PurchaseInfoPoint',
  props: {
    contentFullWidth: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.purchase-point {
  &__title {
    display: flex;
    align-items: center;
    height: 86px;
    padding: 0 13px;
    color: #fdfbf4;
    background-color: #c83200;

    img {
      margin-right: 12px;
    }

    p {
      margin: 0;
      font-size: 22px;
      font-weight: 600;
      line-height: 1.2;
    }
  }

  &__thumbnal {
    display: flex;
    align-items: flex-end;
    padding-left: 13px;
  }

  &__description {
    width: 200px;
    padding: 40px 0 35px 0;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.7;
    color: $color-purchase-gold;
  }

  &__content {
    display: flex;
    min-height: 200px;
    padding: 0 10px 0 30px;
    background-color: $color-purchase-dark;

    &--full-width {
      display: block;

      .purchase-point__thumbnal {
        width: 100%;
        margin-right: 0;
        margin-bottom: 20px;
      }

      .purchase-point__description {
        width: 100%;
      }
    }
  }
}
</style>
