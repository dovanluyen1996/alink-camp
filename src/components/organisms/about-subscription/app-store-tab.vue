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
      return this.$store.state.models.subscription.subsAppStore;
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
