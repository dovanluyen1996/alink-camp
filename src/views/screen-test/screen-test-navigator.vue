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
import ScreenTestIndexPage from '@/views/screen-test/index';

export default {
  computed: {
    pageStack() {
      return this.$store.state.screenTestNavigator.stack;
    },
  },
  beforeCreate() {
    this.$store.dispatch('screenTestNavigator/push', ScreenTestIndexPage);
  },
  methods: {
    onPrePush() {
      this.$store.commit('screenTestNavigator/setIsBusy', true);
    },
    onPostPush() {
      this.$store.commit('screenTestNavigator/setIsBusy', false);
    },
    onPrePop() {
      this.$store.commit('screenTestNavigator/setIsBusy', true);
    },
    onPostPop() {
      this.$store.commit('screenTestNavigator/setIsBusy', false);
    },
  },
};
</script>
