<template>
  <v-ons-page>
    <div>
      所持応募券
      999枚 <!-- TODO: currentUser.ticket_count -->
      スタンプ
      1/10 <!-- TODO: currentUser.userStamp.number -->
      あと〜個で応募券
    </div>
    <div>
      <div
        v-for="gift in gifts"
        :key="gift.id"
      >
        {{ gift.name }}
        応募必要枚数：{{ gift.requiredTicketNumber }}枚
        <img :src="gift.image.url">
        {{ gift.overview }}
        <v-ons-button
          modifier="cta"
          @click="applyGift(gift.id)"
        >
          抽選応募する
        </v-ons-button>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
export default {
  computed: {
    gifts() {
      return this.$store.getters['models/gift/all'];
    },
  },
  async created() {
    await this.getGifts();
  },
  methods: {
    applyGift() {
      // TODO: move to apply gift page
    },
    async getGifts() {
      await this.$store.dispatch('models/gift/getGifts');
    },
  },
};
</script>
