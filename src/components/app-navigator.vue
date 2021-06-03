<template>
  <v-ons-navigator
    :page-stack="pageStack"
    :pop-page="popPage"
  />
</template>

<script>
import AppTabbar from '@/components/app-tabbar';

export default {
  computed: {
    pageStack() {
      return this.$store.state.appNavigator.stack;
    },
  },
  beforeCreate() {
    this.$store.dispatch('appNavigator/push', AppTabbar);
  },
  methods: {
    popPage() {
      this.$store.dispatch('appNavigator/pop');
    },
  },
};
</script>
