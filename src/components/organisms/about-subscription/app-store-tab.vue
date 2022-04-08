<template>
  <div class="app-store-tab">
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
  name: 'AboutSubscriptionAppStoreTab',
  computed: {
    descriptions() {
      const subscription = this.$store.getters['models/subscription/current'];

      return subscription ? subscription.appStore : '';
    },
  },
};
</script>

<style lang="scss" scoped>
.app-store-tab__description {
  white-space: pre-wrap;
}
</style>
