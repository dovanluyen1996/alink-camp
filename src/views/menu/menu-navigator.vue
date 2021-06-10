<template>
  <v-ons-navigator
    :page-stack="pageStack"
    :pop-page="popPage"
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
  methods: {
    popPage() {
      this.$store.dispatch('menuNavigator/pop');
    },
  },
};
</script>
