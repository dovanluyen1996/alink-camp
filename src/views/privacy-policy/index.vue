<template>
  <v-ons-page>
    <custom-toolbar title="プライバシーポリシー" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="description" />
  </v-ons-page>
</template>

<script>
export default {
  computed: {
    privacyPolicy() {
      return this.$store.getters['models/privacyPolicy/current'];
    },
    description() {
      if (!this.privacyPolicy) return '';
      return this.privacyPolicy.description;
    },
  },
  async created() {
    await this.getPrivacyPolicy();
  },
  methods: {
    async getPrivacyPolicy() {
      await this.$store.dispatch('models/privacyPolicy/getPrivacyPolicy');
    },
  },
};
</script>
