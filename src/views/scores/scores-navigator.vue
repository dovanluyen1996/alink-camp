<template>
  <v-ons-navigator
    :page-stack="pageStack"
    @prepush="onPrePush"
    @postpush="onPostPush"
    @prepop="onPrePop"
    @postpop="onPostPop"
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
    onPrePush() {
      this.$store.commit('scoresNavigator/setIsBusy', true);
    },
    onPostPush() {
      this.$store.commit('scoresNavigator/setIsBusy', false);
    },
    onPrePop() {
      this.$store.commit('scoresNavigator/setIsBusy', true);
    },
    onPostPop() {
      this.$store.commit('scoresNavigator/setIsBusy', false);
    },
  },
};
</script>
