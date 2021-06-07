<template>
  <v-ons-navigator
    :page-stack="pageStack"
    :pop-page="popPage"
  />
</template>

<script>
import WindForecastIndexPage from '@/views/signed/wind-forecast/index';

export default {
  computed: {
    pageStack() {
      return this.$store.state.windForecastNavigator.stack;
    },
  },
  beforeCreate() {
    this.$store.dispatch('windForecastNavigator/push', WindForecastIndexPage);
  },
  methods: {
    popPage() {
      this.$store.dispatch('windForecastNavigator/pop');
    },
  },
};
</script>
