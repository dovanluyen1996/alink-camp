<template>
  <v-ons-navigator
    :page-stack="pageStack"
    :pop-page="popPage"
  ></v-ons-navigator>
</template>

<script>
import CourseSearchIndexPage from 'views/course-search/index'

export default {
  beforeCreate () {
    this.$store.dispatch('courseSearchNavigator/push', CourseSearchIndexPage)
  },
  computed: {
    pageStack () {
      return this.$store.state.courseSearchNavigator.stack
    }
  },
  methods: {
    popPage () {
      this.$store.dispatch('courseSearchNavigator/pop')
    }
  }
}
</script>
