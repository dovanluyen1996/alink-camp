<template>
  <div class="google-play-tab">
    <!-- eslint-disable-next-line vue/no-v-html -->
    <div v-html="descriptions" />
  </div>
</template>

<script>
export default {
  name: 'AboutSubscriptionGooglePlayTab',
  computed: {
    descriptions() {
      return this.$store.state.models.subscription.subsGooglePlay;
    },
  },
};
</script>
