<template>
  <v-ons-page>
    <custom-toolbar title="プライバシーポリシー" />
    <loading :visible="isLoading" />
    <div class="content">
      <v-ons-card fullscreen>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="description" />
      </v-ons-card>
    </div>
  </v-ons-page>
</template>

<script>
export default {
  computed: {
    isLoading() {
      return this.$store.getters['models/privacyPolicy/isLoading'];
    },
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
