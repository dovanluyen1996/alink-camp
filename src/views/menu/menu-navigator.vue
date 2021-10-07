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
import MenuView from '@/views/menu/index';

export default {
  computed: {
    pageStack() {
      return this.$store.state.menuNavigator.stack;
    },
  },
  created() {
    this.$store.dispatch('menuNavigator/push', MenuView);
  },
  methods: {
    onPrePush() {
      this.$store.commit('menuNavigator/setIsBusy', true);
    },
    onPostPush() {
      this.$store.commit('menuNavigator/setIsBusy', false);
    },
    onPrePop() {
      this.$store.commit('menuNavigator/setIsBusy', true);
    },
    onPostPop() {
      this.$store.commit('menuNavigator/setIsBusy', false);
    },
  },
};
</script>
