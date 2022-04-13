<template>
  <v-ons-page
    :infinite-scroll="search"
    @show="show"
  >
    <custom-toolbar title="周辺検索" />
    <div class="content">
      <div v-if="campsite">
        <campsite-name :campsite-name="campsite.name" />
      </div>

      <spot-list
        v-if="spots.length > 0"
        :spots="spots"
      />

      <v-ons-alert-dialog
        :visible.sync="searchResultEmpty"
      >
        <template #title>
          該当する周辺情報がありません
        </template>

        検索結果に該当する周辺情報がありませんでした。お手数ですが条件を変えてお試しください。

        <template #footer>
          <v-ons-button
            @click="goToSpotSearch()"
          >
            OK
          </v-ons-button>
        </template>
      </v-ons-alert-dialog>
    </div>
  </v-ons-page>
</template>

<script>
// components
import SpotList from '@/components/organisms/spot-list';
import CampsiteName from '@/components/organisms/campsite-name';

export default {
  name: 'SpotSearchResult',
  components: {
    SpotList,
    CampsiteName,
  },
  props: {
    location: {
      type: Object,
      default: null,
    },
    campsite: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      page: 1,
      searchResultEmpty: false,
    };
  },
  computed: {
    spots() {
      return this.$store.getters['models/spot/all'];
    },
    totalCount() {
      return this.$store.getters['models/spot/totalCount'];
    },
  },
  methods: {
    async search(done) {
      // if getted spots is the same with total count, finish paging
      if (this.totalCount === this.$store.getters['models/spot/size']) {
        if (done) done();
        return;
      }

      const searchParams = {
        latitude: this.location.latitude,
        longitude: this.location.longitude,
        page: this.page,
      };

      await this.$store.dispatch('models/spot/getSpots', searchParams)
        .then(() => {
          this.page += 1;
          if (done) done();
        });
    },
    async show() {
      this.$store.dispatch('appTabbar/setLastVisitedAt', this.$helpers.localDateWithHyphenFrom(new Date()));

      const searchParams = {
        latitude: this.location.latitude,
        longitude: this.location.longitude,
        page: this.page,
      };

      await this.$store.dispatch('models/spot/getSpots', searchParams)
        .then(() => {
          this.page += 1;
        });
      if (this.totalCount === 0) this.showDialog();
    },
    closeDialog() {
      this.searchResultEmpty = false;
    },
    showDialog() {
      this.searchResultEmpty = true;
    },
    goToSpotSearch() {
      this.closeDialog();
      this.$store.dispatch('spotSearchNavigator/pop');
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ {
  .list-item {
    border-bottom: 1px solid #d9d9d9;

    &__title {
      font-size: 18px;
      font-weight: normal;
    }

    &__subtitle {
      font-weight: normal;
      color: #00000080;
    }
  }
}
</style>
