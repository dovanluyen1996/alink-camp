<template>
  <v-ons-page>
    <div>
      所持応募券
      {{ currentUser.ticketCount }}枚
      スタンプ
      {{ userStamp.number }}/10
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
          @click="goToGift(gift.id)"
        >
          抽選応募する
        </v-ons-button>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
import ShowGiftView from '@/views/gifts/show';

export default {
  computed: {
    gifts() {
      return this.$store.getters['models/gift/all'];
    },
    currentUser() {
      return this.$store.state.models.currentUser.user;
    },
    userStamp() {
      return this.$store.state.models.userStamp.userStamp;
    },
  },
  async created() {
    await this.getGifts();
    await this.getCurrentUser();
    await this.getUserStamp();
  },
  methods: {
    goToGift(giftId) {
      this.$store.dispatch('menuNavigator/push', {
        extends: ShowGiftView,
        onsNavigatorProps: {
          giftId,
        },
      });
    },
    async getGifts() {
      await this.$store.dispatch('models/gift/getGifts');
    },
    async getCurrentUser() {
      await this.$store.dispatch('models/currentUser/getUser');
    },
    async getUserStamp() {
      await this.$store.dispatch('models/userStamp/getUserStamp');
    },
  },
};
</script>
