<template>
  <v-ons-page @show="show">
    <custom-toolbar
      title="周辺検索"
      :disabled-back-button="true"
    />

    <div class="content">
      <div class="spot-search__top">
        <v-ons-button
          modifier="primary"
          @click="goToSpotSearchByCurrentLocation"
        >
          <img src="@/assets/images/location.png">
          現在位置より検索
        </v-ons-button>
        <div class="spot-search__text">
          予定日、またはお気に入り設定中のキャンプ場
        </div>
      </div>
      <loading :visible="isLoading" />
      <template v-if="favoriteOrPlanned.length">
        <campsite-list
          :is-show-favorite-mark="true"
          :campsites="favoriteOrPlanned"
          :has-chevron="false"
          @click="goToSearchSpotByCampsite"
        />
      </template>

      <v-ons-card
        v-else
        class="spot-search__note"
      >
        <p>
          まだお気に入りや予定日設定して <br>
          いるキャンプ場がありません。キャンプ場検索 <br>
          より、設定してください
        </p>
        <v-ons-button
          modifier="search"
          @click="goToSearchCampsite"
        >
          <img src="@/assets/images/form/search-top.png">
          キャンプ場検索
        </v-ons-button>
      </v-ons-card>
    </div>
  </v-ons-page>
</template>

<script>
// components
import CampsiteList from '@/components/organisms/campsite-list';

export default {
  components: {
    CampsiteList,
  },
  computed: {
    favorites() {
      const favorites = this.$store.getters['models/usersFavorite/all'];
      const planIds = this.$store.getters['models/userCampsitePlan/inFuture'].map(plan => plan.campsite.id);

      return favorites.filter(favorite => !planIds.includes(favorite.id));
    },
    favoriteOrPlanned() {
      const favorites = this.$store.getters['models/usersFavorite/all'];
      let campsites = this.$store.getters['models/userCampsitePlan/inFuture'].map(plan => plan.campsite);

      // uniq campsites
      campsites = campsites.filter(
        (campsite, index) => campsites.findIndex(element => element.id === campsite.id) === index,
      );

      // sort campsites
      campsites = campsites.sort(
        (a, b) => {
          const favorited = favorites.some(favorite => a.id === favorite.id);
          const aStartedDate = this.$moment(a.startedDate).startOf('days');
          const bStartedDate = this.$moment(b.startedDate).startOf('days');
          let sort = 0;
          sort = aStartedDate.isAfter(bStartedDate) ? 1 : -1;
          if (aStartedDate.isSame(bStartedDate)) sort = favorited ? -1 : 1;
          return sort;
        },
      );

      return campsites.concat(favorites);
    },
    isLoading() {
      const loadPlan = this.$store.getters['models/userCampsitePlan/isLoading'];
      const loadFavorite = this.$store.getters['models/usersFavorite/isLoading'];

      return loadPlan || loadFavorite;
    },
  },
  methods: {
    goToSearchSpotByCampsite() {
      // TODO: Redirect to Campsite
    },
    goToSpotSearchByCurrentLocation() {
      // TODO: Redirect to Current Location
    },
    goToSearchCampsite() {
      // TODO: implement redirect to キャンプ場検索 when implement Logic
    },
    async show() {
      this.$store.dispatch('appTabbar/setLastVisitedAt', this.$helpers.localDateWithHyphenFrom(new Date()));
      await this.$store.dispatch('models/userCampsitePlan/getUserCampsitePlans');
      await this.$store.dispatch('models/usersFavorite/getUsersFavorites');
    },
  },
};
</script>

<style lang="scss" scoped>
.spot-search {
  &__top {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100px;
    margin: 30px 0 10px 0;
  }

  &__text {
    font-size: 14px;
    font-weight: 600;
  }

  &__note {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 458px;
    text-align: center;

    & > p {
      margin-bottom: 20px;
      font-size: 18px;
      font-weight: 600;
      color: #000;
    }
  }
}

/deep/ {
  .button--primary {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 10px 20px;
    background: #ffc134;

    & > img {
      margin-right: 10px;
    }
  }

  .button--search {
    display: flex;
    align-items: center;
  }

  .list-item {
    border-bottom: 1px solid #d9d9d9;

    &__title {
      font-weight: 300;
    }

    &__subtitle {
      font-weight: 300;
      color: #00000080;
    }
  }
}
</style>
