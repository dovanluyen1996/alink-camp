<template>
  <div class="terms-of-service-description">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="descriptions" />
  </div>
</template>

<script>
export default {
  name: 'TermsOfServiceDescription',
  computed: {
    descriptions() {
      return this.$store.getters['models/termOfService/description'];
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
