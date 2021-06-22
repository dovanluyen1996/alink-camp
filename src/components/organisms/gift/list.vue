<template>
  <div class="gift-list">
    <v-ons-card
      v-for="gift in gifts"
      :key="gift.id"
      class="gift-item"
    >
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
          {{ gift.overview }}
        </div>
        <div class="gift-item__footer">
          <v-ons-button
            modifier="large--cta rounded"
            @click="clickGift(gift)"
          >
            抽選応募する
          </v-ons-button>
        </div>
      </div>
    </v-ons-card>
  </div>
</template>

<script>
export default {
  name: 'GiftList',
  props: {
    gifts: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  methods: {
    clickGift(gift) {
      this.$emit('click', gift.id);
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
    font-weight: 300;
  }

  &__content {
    font-weight: 300;

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
