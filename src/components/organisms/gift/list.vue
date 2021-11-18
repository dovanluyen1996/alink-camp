<template>
  <div class="gift-list">
    <card-gift
      v-for="gift in gifts"
      :key="gift.id"
      :gift="gift"
    >
      {{ gift.overview }}
      <template #footer>
        <v-ons-button
          modifier="large--cta rounded"
          :disabled="isApplied(gift)"
          @click="clickGift(gift)"
        >
          抽選応募する
        </v-ons-button>
        <template v-if="isApplied(gift)">
          <div class="already-applied">
            ※既にこのアカウントで応募済みです
          </div>
        </template>
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
  computed: {
    isApplied() {
      return function(gift) {
        return !!this.$store.getters['models/userGift/findByGiftId'](gift.id);
      };
    },
  },
  methods: {
    clickGift(gift) {
      this.$emit('click', gift.id);
    },
  },
};
</script>

<style scoped lang="scss">
.already-applied {
  margin-top: 10px;
  color: #de133c;
  text-align: center;
}
</style>
