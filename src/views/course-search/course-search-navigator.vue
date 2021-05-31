<template>
  <v-ons-navigator
    :page-stack="pageStack"
    :pop-page="popPage"
  />
</template>

<script>
import CourseSearchIndexPage from 'views/course-search/index';

export default {
  computed: {
    pageStack() {
      return this.$store.state.courseSearchNavigator.stack;
    },
  },
  beforeCreate() {
    this.$store.dispatch('courseSearchNavigator/push', CourseSearchIndexPage);
  },
  methods: {
    popPage() {
      this.$store.dispatch('courseSearchNavigator/pop');
    },
  },
};
</script>
