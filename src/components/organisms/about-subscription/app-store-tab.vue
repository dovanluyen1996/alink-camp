<template>
  <div class="app-store-tab">
    <loading :visible="isLoading" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="descriptions" />
  </div>
</template>

<script>
export default {
  name: 'AboutSubscriptionAppStoreTab',
  computed: {
    isLoading() {
      return this.$store.getters['models/subscription/isLoading'];
    },
    descriptions() {
      const subscription = this.$store.getters['models/subscription/current'];

      return subscription ? subscription.appStore : '';
    },
  },
  async created() {
    await this.getSubscription();
  },
  methods: {
    async getSubscription() {
      await this.$store.dispatch('models/subscription/getSubscription');
    },
  },
};
</script>
