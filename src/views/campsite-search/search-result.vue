<template>
  <v-ons-page
    :infinite-scroll="search"
    @show="show"
  >
    <loading :visible="isLoading" />
    <custom-toolbar
      :title="title"
      :subtitle="subtitle"
    />
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
        modifier="large-search rounded yellow"
        @click="showFiltering()"
      >
        絞り込み
      </v-ons-button>

      <v-ons-button
        v-else-if="footerType === 'conditionsChange'"
        modifier="large-search rounded yellow"
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
    subtitle: {
      type: String,
      default: '',
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
    show() {
      // NOTE: 前のページ(検索フォーム)に戻ったときにページ一番上が表示されているようにする
      //       アニメーション中に戻る動作が見えないようにこのページが表示されてから行う必要がある
      //       そのため、前のページでは処理を作れない
      const prevPage = this.$parent.$children[this.$parent.$children.length - 2];

      this.movePrevPageToTop(prevPage);
    },
    movePrevPageToTop(prevPage) {
      const scrollContent = prevPage.$el.querySelector('.content-with-footer__content');

      if (!scrollContent) return;

      // NOTE: visibleな要素でないとscrollTopの値は取得できないので、一度検索結果の裏に表示させてから再度非表示にする
      prevPage.$el.style.display = 'block';
      scrollContent.scrollTo(0, 0);

      setTimeout(() => {
        prevPage.$el.style.display = 'none';
      }, 10);
    },
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
