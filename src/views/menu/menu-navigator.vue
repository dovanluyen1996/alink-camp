<template>
  <v-ons-navigator
    :page-stack="pageStack"
  />
</template>

<script>
// For test
// TODO: change to Menu page after implement Menu
import ListHelps from '@/views/helps/index';

export default {
  computed: {
    pageStack() {
      return this.$store.state.menuNavigator.stack;
    },
  },
  beforeCreate() {
    // For test
    // TODO: change to Menu page after implement Menu
    this.$store.dispatch('menuNavigator/push', ListHelps);
  },
};
</script>
