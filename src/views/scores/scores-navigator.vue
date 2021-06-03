<template>
  <v-ons-navigator
    :page-stack="pageStack"
    :pop-page="popPage"
  />
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
  methods: {
    popPage() {
      this.$store.dispatch('scoresNavigator/pop');
    },
  },
};
</script>
