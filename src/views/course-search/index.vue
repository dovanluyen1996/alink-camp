<template>
  <v-ons-page>
    <custom-toolbar title="コース検索" />
    <div class="content">
      <search-field
        v-model="searchText"
        @goToSearchResult="goToSearchResult"
      />
      <course-list
        :has-chevron="false"
        title="閲覧履歴"
      />
      <fixed-footer>
        <v-ons-button
          modifier="cta rounded"
          @click="goToPrefecturesSearch"
        >
          地域より選択
        </v-ons-button>
        <v-ons-button
          modifier="cta rounded"
          @click="goToConditionsSearch"
        >
          絞り込み選択
        </v-ons-button>
      </fixed-footer>
    </div>
  </v-ons-page>
</template>

<script>
// components
import SearchField from '@/components/organisms/form/search-field.vue';
import CourseList from '@/components/organisms/course-list.vue';
import FixedFooter from '@/components/organisms/fixed-footer';

// pages
import SearchResult from '@/views/course-search/search-result';
import PrefecturesSearch from '@//views/course-search/prefectures-search';

export default {
  name: 'CourseSearch',
  components: {
    SearchField,
    CourseList,
    FixedFooter,
  },
  data() {
    return {
      searchText: '',
    };
  },
  methods: {
    goToPrefecturesSearch() {
      this.$store.dispatch('courseSearchNavigator/push', PrefecturesSearch);
    },
    goToConditionsSearch() {
      console.log('goToConditionsSearch');
    },
    goToSearchResult() {
      console.log('goToSearchResult', this.searchText);
      this.$store.dispatch('courseSearchNavigator/push', {
        extends: SearchResult,
        onsNavigatorProps: {
          title: 'コース検索結果',
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.fixed-footer {
  display: flex;
  justify-content: space-evenly;

  .button {
    width: 150px;
  }
}
</style>
