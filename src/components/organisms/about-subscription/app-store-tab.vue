<template>
  <div class="app-store-tab">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="descriptions" />
  </div>
</template>

<script>
export default {
  name: 'AboutSubscriptionAppStoreTab',
  computed: {
    descriptions() {
      if (!this.$store.state.models.subscription.subscription) return null;

      return this.$store.state.models.subscription.subscription.appStore;
    },
  },
  async created() {
    await this.getDescription();
  },
  methods: {
    async getDescription() {
      await this.$store.dispatch('models/subscription/getSubscription');
    },
  },
};
</script>
