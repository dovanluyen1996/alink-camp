<template>
  <v-ons-navigator
    :page-stack="pageStack"
    :pop-page="popPage"
  />
</template>

<script>
import StartIndex from '@/views/start';

export default {
  computed: {
    pageStack() {
      return this.$store.state.appNavigator.stack;
    },
  },
  created() {
    this.$store.dispatch('appNavigator/push', StartIndex);
  },
  methods: {
    popPage() {
      this.$store.dispatch('appNavigator/pop');
    },
  },
};
</script>
