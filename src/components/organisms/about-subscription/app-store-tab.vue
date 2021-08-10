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
    subscription() {
      return this.$store.getters['models/subscription/current'];
    },
    descriptions() {
      if (!this.subscription) return '';
      return this.subscription.appStore;
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
