<template>
  <div class="purchase-point">
    <div class="purchase-point__title">
      <img
        :src="require('@/assets/images/purchase-information/point-icon.png')"
        alt="purchase-point"
        width="52px"
      >
      <p>
        <slot name="title" />
      </p>
    </div>
    <div
      class="purchase-point__content"
      :class="{ 'purchase-point__content--full-width': contentFullWidth }"
    >
      <div class="purchase-point__thumbnal">
        <slot name="thumbnail" />
      </div>
      <div class="purchase-point__description">
        <slot />
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
    padding: 0 18px;
    color: #fff;
    background-color: $color-green;

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
    width: 50%;
    margin-right: 20px;

    img {
      width: 100%;
      height: auto;
    }
  }

  &__description {
    display: flex;
    align-items: center;
    width: 50%;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.7;
    color: $color-green;
  }

  &__content {
    display: flex;
    min-height: 210px;
    padding: 25px 12px;
    background-color: #fff;

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
