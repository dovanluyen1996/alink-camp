<template>
  <v-ons-page @show="show">
    <custom-toolbar title="キャンプ場検索" />

    <loading :visible="isLoading" />
    <div class="content">
      <content-with-footer>
        <search-field
          v-model="searchText"
          @searched="goToCampsiteSearchResult"
        />
        <campsite-list
          v-if="viewedCampsites.length > 0"
          :campsites="viewedCampsites"
          :has-chevron="false"
          title="閲覧履歴"
          @click="goToCampsiteShow"
        />
      </content-with-footer>
    </div>
  </v-ons-page>
</template>

<script>
// pages
import SearchResult from '@/views/campsite-search/search-result';

// components
import SearchField from '@/components/organisms/form/search-field.vue';
import CampsiteShow from '@/views/campsites/show';
import CampsiteList from '@/components/organisms/campsite-list';
import ContentWithFooter from '@/components/organisms/content-with-footer';

export default {
  name: 'CampsiteSearch',
  components: {
    SearchField,
    CampsiteList,
    ContentWithFooter,
  },
  data() {
    return {
      searchText: '',
    };
  },
  computed: {
    viewedCampsites() {
      const getViewedCampsites = this.$store.getters['campsite/viewedCampsites'];
      const rerveseViewedCampsites = getViewedCampsites.reverse();
      return rerveseViewedCampsites || [];
    },
    isLoading() {
      return this.$store.getters['models/campsite/isLoading'];
    },
  },
  methods: {
    goToCampsiteSearchResult(searchConditions) {
      this.$store.dispatch('campsiteSearchNavigator/push', {
        extends: SearchResult,
        onsNavigatorProps: {
          title: 'キャンプ場検索結果',
          searchConditions,
        },
      });
    },
    goToCampsiteShow(campsite) {
      this.$store.dispatch('campsiteSearchNavigator/push', {
        extends: CampsiteShow,
        onsNavigatorProps: {
          campsite,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content-with-footer {
  .button {
    width: 150px;
  }
}
</style>
