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
import CourseWeatherIndexPage from '@/views/course-weather/index';

export default {
  computed: {
    pageStack() {
      return this.$store.state.courseWeatherNavigator.stack;
    },
  },
  beforeCreate() {
    this.$store.dispatch('courseWeatherNavigator/push', CourseWeatherIndexPage);
  },
  methods: {
    onPrePush() {
      this.$store.commit('courseWeatherNavigator/setIsBusy', true);
    },
    onPostPush() {
      this.$store.commit('courseWeatherNavigator/setIsBusy', false);
    },
    onPrePop() {
      this.$store.commit('courseWeatherNavigator/setIsBusy', true);
    },
    popPage() {
      this.$store.dispatch('courseWeatherNavigator/pop');
    },
    onPostPop() {
      this.$store.commit('courseWeatherNavigator/setIsBusy', false);
    },
  },
};
</script>
