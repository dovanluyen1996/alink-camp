<template>
  <v-ons-navigator
    :page-stack="pageStack"
    :pop-page="popPage"
  />
</template>

<script>
import CourseWeatherIndexPage from 'views/course-weather/index';

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
    popPage() {
      this.$store.dispatch('courseWeatherNavigator/pop');
    },
  },
};
</script>
