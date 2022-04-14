<template>
  <v-ons-page @show="show">
    <custom-toolbar
      title="周辺検索"
      :disabled-back-button="true"
    />
    <loading :visible="isLoading" />
    <div class="content">
      <div class="spot-search">
        <v-ons-button
          class="button-search"
          modifier="yellow"
          @click="goToSpotSearchByCurrentLocation"
        >
          現在位置より検索
        </v-ons-button>
        <div class="spot-search__text">
          予定日、またはお気に入り設定中のキャンプ場
        </div>
      </div>
      <campsite-list
        v-if="favoriteOrPlanned.length > 0"
        :is-show-favorite-mark="true"
        :campsites="favoriteOrPlanned"
        :has-chevron="false"
        @click="goToSearchSpotByCampsite"
      />

      <v-ons-card
        v-else
        class="spot-search__note"
      >
        <p>
          まだお気に入りや予定日設定しているキャンプ場がありません。<br>
          キャンプ場検索より設定してください。
        </p>
      </v-ons-card>

      <div class="button-search-center">
        <go-to-campsite-search-button />
      </div>
    </div>
    <v-ons-alert-dialog
      :visible.sync="geoLocationErrorVisible"
    >
      <template #title>
        位置情報が取得できませんでした
      </template>

      位置情報が取得できませんでした。<br>
      お手数ですが、通信状況の良いところで再度お試しください。または、アプリの設定にて位置情報送信の許諾をしているかご確認ください

      <template #footer>
        <v-ons-button
          @click="closeGeoLocationErrorDialog()"
        >
          OK
        </v-ons-button>
      </template>
    </v-ons-alert-dialog>
  </v-ons-page>
</template>

<script>
// components
import CampsiteList from '@/components/organisms/campsite-list';
import GoToCampsiteSearchButton from '@/components/organisms/go-to-campsite-search-button';

// pages
import SearchResult from '@/views/spot-search/search-result';

import settings from '@/config/settings';

export default {
  components: {
    CampsiteList,
    GoToCampsiteSearchButton,
  },
  data() {
    return {
      geoLocationErrorVisible: false,
      latitude: null,
      longitude: null,
    };
  },
  computed: {
    favoriteCampsitesOnly() {
      const favorites = this.$store.getters['models/usersFavorite/all'];
      const planIds = this.$store.getters['models/userCampsitePlan/inFuture']().map(plan => plan.campsite.id);

      return favorites.filter(favorite => !planIds.includes(favorite.id));
    },
    favoriteOrPlanned() {
      const allFavoriteCampsites = this.$store.getters['models/usersFavorite/all'];
      let campsites = this.$store.getters['models/userCampsitePlan/inFuture']().map(plan => plan.campsite);

      // uniq campsites
      campsites = campsites.filter(
        (campsite, index) => campsites.findIndex(element => element.id === campsite.id) === index,
      );

      // sort campsites
      campsites = campsites.sort(
        (a, b) => {
          const favorited = allFavoriteCampsites.some(favorite => a.id === favorite.id);
          const aStartedDate = this.$moment(a.startedDate).startOf('days');
          const bStartedDate = this.$moment(b.startedDate).startOf('days');
          let sort = 0;
          sort = aStartedDate.isAfter(bStartedDate) ? 1 : -1;
          if (aStartedDate.isSame(bStartedDate)) sort = favorited ? -1 : 1;
          return sort;
        },
      );

      return campsites.concat(this.favoriteCampsitesOnly);
    },
    isLoading() {
      const loadPlan = this.$store.getters['models/userCampsitePlan/isLoading'];
      const loadFavorite = this.$store.getters['models/usersFavorite/isLoading'];

      return loadPlan || loadFavorite;
    },
  },
  methods: {
    goToSearchSpotByCampsite(campsite) {
      // Reset before search result
      this.$store.dispatch('models/spot/resetSpots');

      this.$store.dispatch('spotSearchNavigator/push', {
        extends: SearchResult,
        onsNavigatorProps: {
          location: {
            latitude: campsite.latitude,
            longitude: campsite.longitude,
          },
          campsite,
        },
      });
    },
    goToSpotSearchByCurrentLocation() {
      Promise.resolve()
        .then(() => this.getGeoLocation())
        .then(() => {
          // Reset before search result
          this.$store.dispatch('models/spot/resetSpots');

          this.$store.dispatch('spotSearchNavigator/push', {
            extends: SearchResult,
            onsNavigatorProps: {
              location: {
                latitude: this.latitude,
                longitude: this.longitude,
              },
            },
          });
        })
        .catch((e) => {
          console.error(e);
        });
    },
    async show() {
      this.$store.dispatch('appTabbar/setLastVisitedAt', this.$helpers.localDateWithHyphenFrom(new Date()));
      await this.$store.dispatch('models/userCampsitePlan/getUserCampsitePlans');
      await this.$store.dispatch('models/usersFavorite/getUsersFavorites');
    },
    getGeoLocation() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;

            resolve();
          }, (e) => {
            this.latitude = null;
            this.longitude = null;
            this.showGeoLocationErrorDialog();

            reject(e);
          }, {
            timeout: settings.locationServices.timeout,
          },
        );
      });
    },
    closeGeoLocationErrorDialog() {
      this.geoLocationErrorVisible = false;
    },
    showGeoLocationErrorDialog() {
      this.geoLocationErrorVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.spot-search {
  margin-bottom: -12px;
  text-align: center;

  &__text {
    font-size: 14px;
    font-weight: 600;
  }

  &__note {
    padding: 0;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.5);

    & > p {
      padding: 18px 20px;
      font-size: 18px;
      font-weight: 600;
      line-height: 24px;
      color: #000;
    }
  }
}

.button-search {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  margin: 50px 50px 15px;
  border-radius: 15px;

  &::before {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-right: 6px;
    content: '';
    background-image: url("~@/assets/images/location.png");
    background-position: center;
    background-size: 100%;
  }
}

/deep/ {
  .button--primary {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 10px 20px;
    background: $color-yellow;

    & > img {
      margin-right: 10px;
    }
  }

  .button-search-center {
    text-align: center;
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
