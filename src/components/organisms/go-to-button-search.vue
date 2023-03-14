<template>
  <v-ons-button
    class="button-click"
    @click="goToCampsiteSearch"
  >
    <p class="click-hover">
      キャンプ場検索
    </p>
  </v-ons-button>
</template>

<script>
export default {
  name: 'GoToCampsiteSearchButton',
  methods: {
    goToCampsiteSearch() {
      this.$store.dispatch('campsiteSearchNavigator/resetFromOtherTab');
    },
  },
};
</script>
