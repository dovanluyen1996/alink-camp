<template>
  <v-ons-page :infinite-scroll="search">
    <loading :visible="isLoading" />
    <custom-toolbar :title="title" />
    <div class="content">
      <template v-if="campsites.length === 0">
        <no-data>
          条件に合うキャンプ場が見つかりません
        </no-data>
      </template>

      <template v-else>
        <campsite-list
          :campsites="campsites"
          :current-location="currentLocation"
          @click="goToCampsiteShow"
        />
      </template>

      <campsite-list-filter-dialog
        :is-visible-filtering.sync="isVisibleFilterDialog"
        @filter="filter"
      />
    </div>

    <fixed-footer>
      <v-ons-button
        v-if="footerType === 'filtering'"
        class="button--search"
        modifier="large--cta rounded yellow"
        @click="showFiltering()"
      >
        絞り込み
      </v-ons-button>

      <v-ons-button
        v-else-if="footerType === 'conditionsChange'"
        class="button--search"
        modifier="large--cta rounded yellow"
        @click="goToConditionsSearch()"
      >
        条件変更
      </v-ons-button>
    </fixed-footer>
  </v-ons-page>
</template>

<script>
// components
import NoData from '@/components/organisms/no-data';
import CampsiteList from '@/components/organisms/campsite-list';
import CampsiteListFilterDialog from '@/components/organisms/campsite-search/filter-dialog.vue';
import FixedFooter from '@/components/organisms/fixed-footer';

// pages
import CampsiteShow from '@/views/campsites/show';

export default {
  name: 'CampsiteSearchResult',
  components: {
    NoData,
    CampsiteList,
    CampsiteListFilterDialog,
    FixedFooter,
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
      isFiltered: false,
      facilityFilterParams: {},
    };
  },
  computed: {
    campsites() {
      return this.$store.getters['models/campsite/all'];
    },
    totalCount() {
      return this.$store.getters['models/campsite/totalCount'];
    },
    isLoading() {
      return this.$store.state.models.campsite.isLoading;
    },
    footerType() {
      let type = null;

      if (this.campsites.length === 0 && this.isFiltered) {
        type = 'filtering';
      } else if (this.isConditionsChangeable()) {
        type = 'conditionsChange';
      } else if (this.isFilteringEnable()) {
        type = 'filtering';
      }

      return type;
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

      const searchParams = {
        ...this.searchFacilityParams(),
        ...this.searchParams(),
      };

      await this.$store.dispatch('models/campsite/getCampsites', searchParams)
        .then(() => {
          this.page += 1;
          if (done) done();
        });
    },
    async filter(filterParams) {
      this.$store.dispatch('models/campsite/resetCampsites');
      this.page = 1;
      this.isVisibleFilterDialog = false;
      this.facilityFilterParams = { ...filterParams };

      const searchParams = {
        ...this.facilityFilterParams,
        ...this.searchParams(),
      };
      await this.$store.dispatch('models/campsite/getCampsites', searchParams)
        .then(() => {
          this.page += 1;
          this.isFiltered = true;
        });
    },
    searchByNameParams() {
      return {
        name: this.searchConditions.name,
        page: this.page,
      };
    },
    searchByAreaParams() {
      return {
        prefecture_id: this.searchConditions.prefecture_id,
        target_date: this.searchConditions.target_date,
        max_temp: this.searchConditions.max_temp,
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
        target_date: this.searchConditions.target_date,
        max_temp: this.searchConditions.max_temp,
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
    searchFacilityParams() {
      if (this.$helpers.isPresentObject(this.facilityFilterParams)) {
        return this.facilityFilterParams;
      }

      const searchParamKeys = Object.keys(this.searchParams());
      searchParamKeys.push('type');

      Object.keys(this.searchConditions).forEach((key) => {
        if (searchParamKeys.includes(key)) return;

        this.facilityFilterParams[key] = this.searchConditions[key];
      });

      return this.facilityFilterParams;
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
</style>
