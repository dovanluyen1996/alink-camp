<template>
  <v-ons-page>
    <custom-toolbar title="コース検索" />
    <div class="content">
      <card-with-tab
        :tabs="tabs"
      />
      <fixed-footer>
        <v-ons-button
          modifier="large--cta rounded"
          @click="goToSearchResult"
        >
          絞り込み選択
        </v-ons-button>
      </fixed-footer>
    </div>
  </v-ons-page>
</template>

<script>
// components
import CardWithTab from '@/components/organisms/card-with-tab';
import FixedFooter from '@/components/organisms/fixed-footer';

// tab contents
import CourseSearchAreaTab from '@/components/organisms/course-search/area-tab';
import CourseSearchLocationTab from '@/components/organisms/course-search/location-tab';

// pages
import SearchResult from '@/views/course-search/search-result';

export default {
  name: 'CourseConditionsSearch',
  components: {
    CardWithTab,
    FixedFooter,
  },
  data() {
    return {
      tabs: [
        {
          label: 'エリアより検索',
          component: CourseSearchAreaTab,
        },
        {
          label: '現在位置より検索',
          component: CourseSearchLocationTab,
        },
      ],
    };
  },
  computed: {
    searchConditions() {
      return this.$store.state.courseSearchNavigator.searchConditions;
    },
  },
  methods: {
    goToSearchResult() {
      console.log('goToSearchResult', this.searchConditions);

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

<style scoped lang="scss">
</style>
