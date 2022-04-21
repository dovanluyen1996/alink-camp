<template>
  <v-ons-button
    modifier="search yellow"
    @click="goToCampsiteSearch"
  >
    キャンプ場検索
  </v-ons-button>
</template>

<script>
export default {
  name: 'GoToCampsiteSearchButton',
  methods: {
    goToCampsiteSearch() {
      this.$store.commit('campsiteSearchNavigator/setEnableBusy', false);
      this.$store.dispatch('campsiteSearchNavigator/resetFromOtherNavigator');
    },
  },
};
</script>
