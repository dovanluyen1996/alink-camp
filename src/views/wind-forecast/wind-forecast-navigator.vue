<template>
  <v-ons-navigator
    :page-stack="pageStack"
    :pop-page="popPage"
    @prepush="onPrePush"
    @postpush="onPostPush"
    @prepop="onPrePop"
    @postpop="onPostPop"
  />
</template>

<script>
import WindForecastIndexPage from '@/views/wind-forecast/index';

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
    onPrePush() {
      this.$store.commit('windForecastNavigator/setIsBusy', true);
    },
    onPostPush() {
      this.$store.commit('windForecastNavigator/setIsBusy', false);
    },
    onPrePop() {
      this.$store.commit('windForecastNavigator/setIsBusy', true);
    },
    popPage() {
      this.$store.dispatch('windForecastNavigator/pop');
    },
    onPostPop() {
      this.$store.commit('windForecastNavigator/setIsBusy', false);
    },
  },
};
</script>
