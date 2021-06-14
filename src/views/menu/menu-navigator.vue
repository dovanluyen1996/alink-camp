<template>
  <v-ons-navigator
    :page-stack="pageStack"
  />
</template>

<script>
// For test
// TODO: change to Menu page after implement Menu
import NoticesView from '@/views/notices/index';

export default {
  computed: {
    pageStack() {
      return this.$store.state.menuNavigator.stack;
    },
  },
  created() {
    // For test
    // TODO: change to Menu page after implement Menu
    this.$store.dispatch('menuNavigator/push', NoticesView);
  },
};
</script>
