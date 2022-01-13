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
import CampsiteWeatherIndexPage from '@/views/campsite-weather/index';

export default {
  computed: {
    pageStack() {
      return this.$store.state.campsiteWeatherNavigator.stack;
    },
  },
  beforeCreate() {
    this.$store.dispatch('campsiteWeatherNavigator/push', CampsiteWeatherIndexPage);
  },
  methods: {
    onPrePush() {
      this.$store.commit('campsiteWeatherNavigator/setIsBusy', true);
    },
    onPostPush() {
      this.$store.commit('campsiteWeatherNavigator/setIsBusy', false);
    },
    onPrePop() {
      this.$store.commit('campsiteWeatherNavigator/setIsBusy', true);
    },
    popPage() {
      this.$store.dispatch('campsiteWeatherNavigator/pop');
    },
    onPostPop() {
      this.$store.commit('campsiteWeatherNavigator/setIsBusy', false);
    },
  },
};
</script>
