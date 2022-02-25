<template>
  <v-ons-page :infinite-scroll="search">
    <custom-toolbar :title="title" />
    <div class="content">
      <no-data v-if="campsites.length === 0">
        条件に合うキャンプ場が見つかりません
      </no-data>

      <template v-else>
        <content-with-footer>
          <campsite-list
            :campsites="campsites"
            :current-location="currentLocation"
            @click="goToCampsiteShow"
          />
          <template #footer v-if="isConditionsChangeable()">
            <v-ons-button
              class="button--search"
              modifier="large--cta rounded yellow"
              @click="goToConditionsSearch()"
            >
              条件変更
            </v-ons-button>
          </template>
          <template #footer v-else-if="isFilteringEnable()">
            <v-ons-button
              class="button--search"
              modifier="large--cta rounded yellow"
              @click="showFiltering()"
            >
              絞り込み
            </v-ons-button>
            <campsite-list-filter-dialog
              :is-visible-filtering.sync="isVisibleFilterDialog"
              @filter="filter"
            >
          </template>
        </content-with-footer>
      </template>
    </div>
  </v-ons-page>
</template>

<script>
// components
import NoData from '@/components/organisms/no-data';
import CampsiteList from '@/components/organisms/campsite-list';
import ContentWithFooter from '@/components/organisms/content-with-footer';
import CampsiteListFilterDialog from '@/components/organisms/campsite-search/filter-dialog.vue';

// pages
import CampsiteShow from '@/views/campsites/show';

export default {
  name: 'CampsiteSearchResult',
  components: {
    NoData,
    CampsiteList,
    ContentWithFooter,
    CampsiteListFilterDialog,
  },
  props: {
    title: {
      type: String,
      default: '検索結果',
    },
    currentLocation: {
      type: Object,
      default: () => null,
    },
    searchConditions: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      page: 2,
      isVisibleFilterDialog: false,
    };
  },
  computed: {
    campsites() {
      return this.$store.getters['models/campsite/all'];
    },
    totalCount() {
      return this.$store.getters['models/campsite/totalCount'];
    },
  },
  methods: {
    goToCampsiteShow(campsite) {
      this.$store.dispatch('campsiteSearchNavigator/push', {
        extends: CampsiteShow,
        onsNavigatorProps: {
          campsite,
        },
      });
    },
    searchType() {
      return this.searchConditions.type || 'name';
    },
    async search(done) {
      // if getted campsites is the same with total count, finish paging
      if (this.totalCount === this.$store.getters['models/campsite/size']) {
        if (done) done();
        return;
      }

      await this.$store.dispatch('models/campsite/getCampsites', this.searchParams())
        .then(() => {
          this.page += 1;
          if (done) done();
        });
    },
    async filter(searchParams) {
      this.page = 2;
      // TODO: search
      console.log(searchParams);
      this.isVisibleFilterDialog = false;
    },
    searchByNameParams() {
      return {
        name: this.searchConditions.name,
        page: this.page,
      };
    },
    searchByAreaParams() {
      return {
        prefecture_id: this.searchConditions.prefecture,
        target_date: this.searchConditions.targetDate,
        temperature: this.searchConditions.temperature,
        sunny: this.searchConditions.sunny,
        wind: this.searchConditions.wind,
        uv: this.searchConditions.uv,
        page: this.page,
      };
    },
    searchByLocationParams() {
      return {
        lower_rad: this.searchConditions.lower_rad,
        upper_rad: this.searchConditions.upper_rad,
        target_date: this.searchConditions.targetDate,
        temperature: this.searchConditions.temperature,
        sunny: this.searchConditions.sunny,
        wind: this.searchConditions.wind,
        uv: this.searchConditions.uv,
        lat: this.searchConditions.lat,
        lon: this.searchConditions.lon,
        page: this.page,
      };
    },
    searchByPrefectureParams() {
      return {
        prefecture_id: this.searchConditions.prefecture.value,
        page: this.page,
      };
    },
    searchParams() {
      switch (this.searchType()) {
      case 'area':
        return this.searchByAreaParams();
      case 'prefecture':
        return this.searchByPrefectureParams();
      case 'location':
        return this.searchByLocationParams();
      default:
        return this.searchByNameParams();
      }
    },
    isFilteringEnable() {
      return !['area', 'location', 'prefecture'].includes(this.searchType());
    },
    showFiltering() {
      this.isVisibleFilterDialog = true;
    },
    isConditionsChangeable() {
      return ['area', 'location'].includes(this.searchType());
    },
    async goToConditionsSearch() {
      await this.$store.dispatch('campsiteSearchNavigator/pop');
    },
  },
};
</script>

<style lang="scss" scoped>
.content-with-footer__footer {
  .button--search {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 48px !important;
    font-size: 14px !important;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.4);

    &::before {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 6px;
      content: '';
      background-image: url("~@/assets/images/form/search-top.png");
      background-position: center;
      background-size: 100%;
    }
  }
}
</style>
