<template>
  <v-ons-navigator
    :page-stack="pageStack"
    @prepush="onPrePush"
    @postpush="onPostPush"
    @prepop="onPrePop"
    @postpop="onPostPop"
  />
</template>

<script>
import ScreenTestIndexPage from "@/views/screen-test/index";

export default {
  computed: {
    pageStack() {
      return this.$store.state.plansNavigator.stack;
    }
  },
  beforeCreate() {
    this.$store.dispatch("plansNavigator/push", ScreenTestIndexPage);
  },
  methods: {
    onPrePush() {
      this.$store.commit("plansNavigator/setIsBusy", true);
    },
    onPostPush() {
      this.$store.commit("plansNavigator/setIsBusy", false);
    },
    onPrePop() {
      this.$store.commit("plansNavigator/setIsBusy", true);
    },
    onPostPop() {
      this.$store.commit("plansNavigator/setIsBusy", false);
    }
  }
};
</script>
