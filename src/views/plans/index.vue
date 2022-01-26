<template>
  <v-ons-page>
    <custom-toolbar title="キャンプ計画" />
    <div class="content">
      <!-- TODO: When implement Logic, plase use Loading in Store  -->
      <!-- <loading :visible="isLoading" /> -->
      <no-data v-if="campsites.length === 0">
        <p>
          まだキャンプ計画がありません。<br>
          キャンプ場検索より、計画を作成してください。
        </p>
        <template #actions>
          <v-ons-button
            class="button--red button--search button--search__description"
            @click="goToPlanSearch"
          >
            <img
              :src="require('@/assets/images/form/search-top.png')"
            >
            キャンプ場検索
          </v-ons-button>
        </template>
      </no-data>

      <campsite-list v-else
        :isShowFavoriteMark="true"
        :campsites="campsites"
        @click="goToPlanDetail"
      />
    </div>
  </v-ons-page>
</template>

<script>
// components
import NoData from '@/components/organisms/no-data';
import CampsiteList from '@/components/organisms/campsite-list';

// pages
import CampsitePlan from '@/views/plans/campsite-plan';
import CampsiteSearchIndex from '@/views/campsite-search/index';

export default {
  name: 'CampsitesIndex',
  components: {
    NoData,
    CampsiteList,
  },
  computed: {
    campsites() {
      return [];
    },
    plans() {
      return [];
    }
  },
  methods: {
    goToPlanSearch() {
      this.$store.commit('campsiteSearchNavigator/setEnableBusy', false);
      this.$store.dispatch('campsiteSearchNavigator/reset', {
        extends: CampsiteSearchIndex,
        onsNavigatorOptions: {
          callback: () => {
            this.$store.commit('campsiteSearchNavigator/setEnableBusy', true);
          },
        },
      });

      this.$store.commit('appTabbar/setActiveIndexFromTabName', 'campsiteSearch');
    },
    goToPlanDetail() {
      this.$store.dispatch('plansNavigator/push', CampsitePlan);
    },
  },
};
</script>
