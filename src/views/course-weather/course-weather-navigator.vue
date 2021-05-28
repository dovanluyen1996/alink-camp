<template>
  <v-ons-navigator
    :page-stack="pageStack"
    :pop-page="popPage"
  ></v-ons-navigator>
</template>

<script>
import CourseWeatherIndexPage from 'views/course-weather/index'

export default {
  beforeCreate () {
    this.$store.dispatch('courseWeatherNavigator/push', CourseWeatherIndexPage)
  },
  computed: {
    pageStack () {
      return this.$store.state.courseWeatherNavigator.stack
    }
  },
  methods: {
    popPage () {
      this.$store.dispatch('courseWeatherNavigator/pop')
    }
  }
}
</script>
