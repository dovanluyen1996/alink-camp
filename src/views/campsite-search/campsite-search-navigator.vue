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
import CampsiteSearchIndexPage from '@/views/campsite-search/index';

export default {
  computed: {
    pageStack() {
      return this.$store.state.campsiteSearchNavigator.stack;
    },
  },
  beforeCreate() {
    this.$store.dispatch('campsiteSearchNavigator/push', CampsiteSearchIndexPage);
  },
  methods: {
    onPrePush() {
      this.$store.commit('campsiteSearchNavigator/setIsBusy', true);
    },
    onPostPush() {
      this.$store.commit('campsiteSearchNavigator/setIsBusy', false);
    },
    onPrePop() {
      this.$store.commit('campsiteSearchNavigator/setIsBusy', true);
    },
    onPostPop() {
      this.$store.commit('campsiteSearchNavigator/setIsBusy', false);
    },
  },
};
</script>
