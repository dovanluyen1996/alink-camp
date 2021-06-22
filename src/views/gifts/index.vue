<template>
  <v-ons-page>
    <custom-toolbar title="特典交換" />
    <div class="content">
      <ticket-info
        :ticket-count="currentUser.ticketCount"
        :user-stamp-number="userStamp.number"
      />
      <gift-list
        v-if="gifts.length > 0"
        :gifts="gifts"
        @click="goToGift"
      />
    </div>
  </v-ons-page>
</template>

<script>
// components
import TicketInfo from '@/components/organisms/gift/ticket-info';
import GiftList from '@/components/organisms/gift/list';

// pages
import ShowGiftView from '@/views/gifts/show';

export default {
  name: 'GiftsIndex',
  components: {
    TicketInfo,
    GiftList,
  },
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
