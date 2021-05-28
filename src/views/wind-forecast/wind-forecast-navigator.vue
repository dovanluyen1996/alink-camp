<template>
  <v-ons-navigator
    :page-stack="pageStack"
    :pop-page="popPage"
  ></v-ons-navigator>
</template>

<script>
import WindForecastIndexPage from 'views/wind-forecast/index'

export default {
  beforeCreate () {
    this.$store.dispatch('windForecastNavigator/push', WindForecastIndexPage)
  },
  computed: {
    pageStack () {
      return this.$store.state.windForecastNavigator.stack
    }
  },
  methods: {
    popPage () {
      this.$store.dispatch('windForecastNavigator/pop')
    }
  }
}
</script>
