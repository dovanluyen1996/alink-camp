<template>
  <div class="terms-of-service-description">
    <loading :visible="isLoading" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="description" />
  </div>
</template>

<script>
export default {
  name: 'TermsOfServiceDescription',
  computed: {
    isLoading() {
      return this.$store.getters['models/termsOfService/isLoading'];
    },
    termsOfService() {
      return this.$store.getters['models/termsOfService/current'];
    },
    description() {
      if (!this.termsOfService) return '';
      return this.termsOfService.description;
    },
  },
  async created() {
    await this.getTermsOfService();
  },
  methods: {
    async getTermsOfService() {
      await this.$store.dispatch('models/termsOfService/getTermsOfService');
    },
  },
};
</script>
