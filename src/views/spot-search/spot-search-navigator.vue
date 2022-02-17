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
import SpotSearchPage from '@/views/spot-search/index';

export default {
  computed: {
    pageStack() {
      return this.$store.state.spotSearchNavigator.stack;
    },
  },
  beforeCreate() {
    this.$store.dispatch('spotSearchNavigator/push', SpotSearchPage);
  },
  methods: {
    onPrePush() {
      this.$store.commit('spotSearchNavigator/setIsBusy', true);
    },
    onPostPush() {
      this.$store.commit('spotSearchNavigator/setIsBusy', false);
    },
    onPrePop() {
      this.$store.commit('spotSearchNavigator/setIsBusy', true);
    },
    onPostPop() {
      this.$store.commit('spotSearchNavigator/setIsBusy', false);
    },
  },
};
</script>
