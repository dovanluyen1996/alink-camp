<template>
  <v-ons-navigator
    :page-stack="pageStack"
  />
</template>

<script>
import MenuPage from '@/views/menu/index';

export default {
  computed: {
    pageStack() {
      return this.$store.state.menuNavigator.stack;
    },
  },
  beforeCreate() {
    this.$store.dispatch('menuNavigator/push', MenuPage);
  },
};
</script>
