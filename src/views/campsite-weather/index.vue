<template>
  <v-ons-page @show="show">
    <custom-toolbar
      title="キャンプ天気"
      :disabled-back-button="true"
    />
    <loading :visible="isLoading" />
    <div class="content">
      <no-data v-if="favoriteCampsites.length === 0 && futurePlans.length === 0">
        <p>
          まだお気に入りや予定日設定しているキャンプ場がありません。
          キャンプ場検索より、設定してください。
        </p>
        <template #actions>
          <v-ons-button
            modifier="cta orange search"
            @click="goToCampsiteSearch"
          >
            <img
              :src="require('@/assets/images/form/search-top.png')"
            >
            キャンプ場検索
          </v-ons-button>
        </template>
      </no-data>
      <template v-else>
        <campsite-weather-content
          v-for="plan in futurePlans"
          :key="plan.index"
          :plan="plan"
        />
        <campsite-weather-content
          v-for="campsite in favoriteCampsites"
          :key="campsite.index"
          :campsite="campsite"
        />
      </template>
    </div>
  </v-ons-page>
</template>

<script>
// components
import NoData from '@/components/organisms/no-data';
import CampsiteWeatherContent from '@/components/organisms/campsite-weather/content';
import CampsiteSearchIndex from '@/views/campsite-search/index';

export default {
  name: 'CampWeather',
  components: {
    NoData,
    CampsiteWeatherContent,
  },
  computed: {
    favoriteCampsites() {
      const favorites = this.$store.getters['models/usersFavorite/all'];
      const planIds = this.$store.getters['models/userCampsitePlan/inFuture']().map(plan => plan.campsite.id);

      return favorites.filter(favorite => !planIds.includes(favorite.id));
    },
    futurePlans() {
      const favorites = this.$store.getters['models/usersFavorite/all'];
      const plans = this.$store.getters['models/userCampsitePlan/inFuture']();

      const results = plans.sort(
        (a, b) => {
          const favorited = favorites.some(favorite => a.campsite.id === favorite.id);
          const aStartedDate = this.$moment(a.startedDate).startOf('days');
          const bStartedDate = this.$moment(b.startedDate).startOf('days');
          let sort = 0;

          sort = aStartedDate.isAfter(bStartedDate) ? 1 : -1;
          if (aStartedDate.isSame(bStartedDate)) sort = favorited ? -1 : 1;

          return sort;
        },
      );

      return results;
    },
    isLoading() {
      const loadPlan = this.$store.getters['models/userCampsitePlan/isLoading'];
      const loadFavorite = this.$store.getters['models/usersFavorite/isLoading'];
      const loadWeather = this.$store.getters['models/weather/isLoading'];
      const loadPurchase = this.$store.getters['purchase/isLoading'];

      return loadPlan || loadFavorite || loadWeather || loadPurchase;
    },
  },
  methods: {
    async show() {
      this.$store.dispatch('appTabbar/setLastVisitedAt', this.$helpers.localDateWithHyphenFrom(new Date()));
      await this.$store.dispatch('models/userCampsitePlan/getUserCampsitePlans');
      await this.$store.dispatch('models/usersFavorite/getUsersFavorites');
    },
    goToCampsiteSearch() {
      // TODO: 検索ページのロジック実装時に、ページ遷移を実装する
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
  },
};
</script>
