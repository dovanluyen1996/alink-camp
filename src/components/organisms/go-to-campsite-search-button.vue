<template>
  <v-ons-button
    modifier="search yellow"
    @click="goToCampsiteSearch"
  >
    キャンプ場検索
  </v-ons-button>
</template>

<script>
// pages
import CampsiteSearchIndex from '@/views/campsite-search/index';

export default {
  methods: {
    goToCampsiteSearch() {
      this.$store.commit('campsiteSearchNavigator/setEnableBusy', false);
      this.$store.dispatch('campsiteSearchNavigator/reset', {
        extends: CampsiteSearchIndex,
        onsNavigatorOptions: {
          animation: 'none',
          callback: () => {
            this.$store.commit('campsiteSearchNavigator/setEnableBusy', true);
          },
        },
      });

      this.$store.commit('appTabbar/setActiveIndexFromTabName', 'campsiteSearch');
    },
  },
};
</script>
