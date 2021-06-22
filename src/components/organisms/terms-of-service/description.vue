<template>
  <div class="terms-of-service-description">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="description" />
  </div>
</template>

<script>
export default {
  name: 'TermsOfServiceDescription',
  computed: {
    termOfService() {
      return this.$store.getters['models/termOfService/current'];
    },
    description() {
      if (!this.termOfService) return '';
      return this.termOfService.description;
    },
  },
  async created() {
    await this.getTermOfService();
  },
  methods: {
    async getTermOfService() {
      await this.$store.dispatch('models/termOfService/getTermOfService');
    },
  },
};
</script>
