<template>
  <v-ons-card class="gift-item">
    <div class="content">
      <p class="gift-item__title">
        {{ gift.name }}
      </p>
      <span class="gift-item__subtitle">
        応募必要枚数：{{ gift.requiredTicketNumber }}枚
      </span>
      <div class="gift-item__content">
        <img
          v-if="gift.image.url"
          :src="gift.image.url"
        >
        <slot />
      </div>
      <div
        v-if="$slots.footer"
        class="gift-item__footer"
      >
        <slot name="footer" />
      </div>
    </div>
  </v-ons-card>
</template>

<script>
export default {
  name: 'CardGift',
  props: {
    gift: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_mixins.scss';

.gift-item {
  &__title {
    @include title-style;

    margin-top: 0;
    margin-bottom: 12px;
    text-align: left;
  }

  &__subtitle {
    font-weight: normal;
  }

  &__content {
    font-weight: normal;
    white-space: pre-line;

    img {
      width: 100%;
      height: 180px;
      margin: 16px 0;
      border-radius: 10px;
      object-fit: cover;
    }
  }

  &__footer {
    margin-top: 10px;
    margin-bottom: 6px;
  }
}
</style>
