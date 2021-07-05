<template>
  <v-ons-navigator
    :page-stack="pageStack"
    :pop-page="popPage"
  />
</template>

<script>
import Transition from '@/views/transition';

export default {
  computed: {
    pageStack() {
      return this.$store.state.appNavigator.stack;
    },
  },
  created() {
    this.$store.dispatch('appNavigator/push', Transition);
  },
  methods: {
    popPage() {
      this.$store.dispatch('appNavigator/pop');
    },
  },
};
</script>
