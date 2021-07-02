<template>
  <v-ons-navigator :page-stack="pageStack" />
</template>

<script>
import ScoresIndexPage from '@/views/scores/index';

export default {
  computed: {
    pageStack() {
      return this.$store.state.scoresNavigator.stack;
    },
  },
  beforeCreate() {
    this.$store.dispatch('scoresNavigator/push', ScoresIndexPage);
  },
};
</script>
