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
import CourseSearchIndexPage from '@/views/course-search/index';

export default {
  computed: {
    pageStack() {
      return this.$store.state.courseSearchNavigator.stack;
    },
  },
  created() {
    this.$store.dispatch('courseSearchNavigator/push', CourseSearchIndexPage);
    // Get 閲覧履歴 from Local Storage and save to Store
    this.$store.dispatch('course/setViewedCoursesByCache');
  },
  methods: {
    onPrePush() {
      this.$store.commit('courseSearchNavigator/setIsBusy', true);
    },
    onPostPush() {
      this.$store.commit('courseSearchNavigator/setIsBusy', false);
    },
    onPrePop() {
      this.$store.commit('courseSearchNavigator/setIsBusy', true);
    },
    popPage() {
      this.$store.dispatch('courseSearchNavigator/pop');
    },
    onPostPop() {
      this.$store.commit('courseSearchNavigator/setIsBusy', false);
    },
  },
};
</script>
