<template>
  <v-ons-page>
    <custom-toolbar title="プライバシーポリシー" />
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="descriptions" />
  </v-ons-page>
</template>

<script>
export default {
  computed: {
    descriptions() {
      return this.$store.getters['models/privacyPolicy/description'];
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
