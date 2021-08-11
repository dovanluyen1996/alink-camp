<template>
  <div class="google-play-tab">
    <loading :visible="isLoading" />
    <!-- eslint-disable vue/no-v-html -->
    <div
      class="app-store-tab__description"
      v-html="descriptions"
    />
    <!-- eslint-enable -->
  </div>
</template>

<script>
export default {
  name: 'AboutSubscriptionGooglePlayTab',
  computed: {
    isLoading() {
      return this.$store.getters['models/subscription/isLoading'];
    },
    descriptions() {
      const subscription = this.$store.getters['models/subscription/current'];

      return subscription ? subscription.googlePlay : '';
    },
  },
};
</script>

<style lang="scss" scoped>
.app-store-tab__description {
  white-space: pre-wrap;
}
</style>
