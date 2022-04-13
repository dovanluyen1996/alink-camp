<template>
  <v-ons-page @show="show">
    <custom-toolbar title="キャンプ計画" />
    <loading :visible="isLoading" />
    <div class="content">
      <no-data v-if="campsites.length === 0">
        <p>
          まだキャンプ計画がありません。<br>
          キャンプ場検索より、<br>
          計画を作成してください。
        </p>
        <template #actions>
          <v-ons-button
            modifier="search yellow"
            @click="goToCampsiteSearch"
          >
            <img
              src="@/assets/images/form/search-top.png"
              width="20px"
              height="20px"
            >
            キャンプ場検索
          </v-ons-button>
          <!-- TODO: 何故かコンポーネントがインポートできず、表示されない。 -->
          <!-- <go-to-campsite-search-button /> -->
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
// import GoToCampsiteSearchButton from '@/components/organisms/go-to-campsite-search-button';
import CampsiteList from '@/components/organisms/campsite-list';

// pages
import CampsitePlan from '@/views/plans/campsite-plan';
import CampsiteSearchIndex from '@/views/campsite-search/index';

export default {
  name: 'CampsitesIndex',
  components: {
    NoData,
    // GoToCampsiteSearchButton,
    CampsiteList,
  },
  computed: {
    isLoading() {
      return this.$store.getters['models/userCampsitePlan/isLoading'];
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

          if (aIsFavorited === bIsFavorited) return 0;
          return aIsFavorited ? -1 : 1;
        },
      );

      const campsiteIds = campsites.map(campsite => campsite.id);
      const noPlanFavorites = favoritedCampsites.filter(
        favorite => !campsiteIds.includes(favorite.id),
      );

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
    goToPlanDetail(campsite) {
      this.$store.dispatch('plansNavigator/push', {
        extends: CampsitePlan,
        onsNavigatorProps: {
          campsite,
        },
      });
    },
    async show() {
      this.$store.dispatch('appTabbar/setLastVisitedAt', this.$helpers.localDateWithHyphenFrom(new Date()));
      await this.getPlans();
      await this.getUsersFavorites();
    },
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
