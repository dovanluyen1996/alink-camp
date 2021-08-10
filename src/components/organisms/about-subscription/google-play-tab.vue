<template>
  <div class="google-play-tab">
    <loading :visible="isLoading" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="descriptions" />
  </div>
</template>

<script>
export default {
  name: 'AboutSubscriptionGooglePlayTab',
  computed: {
    isLoading() {
      return this.$store.getters['models/subscription/isLoading'];
    },
    subscription() {
      return this.$store.getters['models/subscription/current'];
    },
    descriptions() {
      if (!this.subscription) return '';
      return this.subscription.googlePlay;
    },
  },
};
</script>
