<template>
  <v-ons-navigator
    :page-stack="pageStack"
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
};
</script>
