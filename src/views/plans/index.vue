<template>
  <v-ons-page @show="show">
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

      <campsite-list
        v-else
        :is-show-favorite-mark="true"
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
    campsites() {
      // お気に入りまたは予定ありのキャンプ場
      const favoritedCampsites = this.$store.getters['models/usersFavorite/all'];
      let campsites = this.$store.getters['models/userCampsitePlan/all'].map(plan => plan.campsite);


      // uniq campsites
      campsites = campsites.filter(
        (campsite, index) => campsites.findIndex(element => element.id === campsite.id) === index,
      );

      // 順番: 1.予定日あり+お気に入り, 2.予定あり, 3.お気に入り
      campsites = campsites.sort(
        (a, b) => {
          const aIsFavorited = favoritedCampsites.some(campsite => a.id === campsite.id);
          const bIsFavorited = favoritedCampsites.some(campsite => b.id === campsite.id);

          if(aIsFavorited == bIsFavorited) return 0;
          return aIsFavorited ? -1 : 1;
        },
      );

      const campsiteIds = campsites.map(campsite => campsite.id);
      const noPlanFavorites = favoritedCampsites.filter(favorite => !campsiteIds.includes(favorite.id));

      return campsites.concat(noPlanFavorites);
    },
  },
  methods: {
    async getPlans() {
      await this.$store.dispatch('models/userCampsitePlan/getUserCampsitePlans');
    },
    async getUsersFavorites() {
      await this.$store.dispatch('models/usersFavorite/getUsersFavorites');
    },
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
    async show() {
      this.$store.dispatch('appTabbar/setLastVisitedAt', this.$helpers.localDateWithHyphenFrom(new Date()));
      await this.getPlans();
      await this.getUsersFavorites();
    },
  },
};
</script>
