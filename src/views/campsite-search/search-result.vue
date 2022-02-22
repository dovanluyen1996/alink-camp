<template>
  <v-ons-page :infinite-scroll="search">
    <custom-toolbar :title="title" />
    <div class="content">
      <no-data v-if="campsites.length === 0">
        条件に合うキャンプ場が見つかりません
      </no-data>

      <campsite-list
        v-else
        :campsites="campsites"
        :current-location="currentLocation"
        @click="goToCampsiteShow"
      />
    </div>
  </v-ons-page>
</template>

<script>
// components
import NoData from '@/components/organisms/no-data';
import CampsiteList from '@/components/organisms/campsite-list';

// pages
import CampsiteShow from '@/views/campsites/show';

export default {
  name: 'CampsiteSearchResult',
  components: {
    NoData,
    CampsiteList,
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
  },
};
</script>
