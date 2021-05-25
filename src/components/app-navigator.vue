<template>
  <v-ons-navigator
    :page-stack="pageStack"
    :pop-page="popPage"
  ></v-ons-navigator>
</template>

<script>
import AppTabbar from './app-tabbar'

export default {
  beforeCreate () {
    this.$store.dispatch('appNavigator/push', AppTabbar)
  },
  computed: {
    pageStack () {
      return this.$store.state.appNavigator.stack
    }
  },
  methods: {
    popPage () {
      this.$store.dispatch('appNavigator/pop')
    }
  }
}
</script>
