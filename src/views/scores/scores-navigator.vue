<template>
  <v-ons-navigator
    :page-stack="pageStack"
    :pop-page="popPage"
  ></v-ons-navigator>
</template>

<script>
import ScoresIndexPage from 'views/scores/index'

export default {
  beforeCreate () {
    this.$store.dispatch('scoresNavigator/push', ScoresIndexPage)
  },
  computed: {
    pageStack () {
      return this.$store.state.scoresNavigator.stack
    }
  },
  methods: {
    popPage () {
      this.$store.dispatch('scoresNavigator/pop')
    }
  }
}
</script>
