<template>
  <div class="gift-list">
    <card-gift
      v-for="gift in gifts"
      :key="gift.id"
      :gift="gift"
    >
      {{ gift.overview }}
      <template slot="footer">
        <v-ons-button
          modifier="large--cta rounded"
          @click="clickGift(gift)"
        >
          抽選応募する
        </v-ons-button>
      </template>
    </card-gift>
  </div>
</template>

<script>
import CardGift from '@/components/organisms/gift/card-gift';

export default {
  name: 'GiftList',
  components: {
    CardGift,
  },
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
