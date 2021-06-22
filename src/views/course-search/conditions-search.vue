<template>
  <v-ons-page>
    <custom-toolbar title="コース検索" />
    <div class="content">
      <card-with-tab
        ref="tabContents"
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

// pages
import SearchResult from '@/views/course-search/search-result';

// tab contents
import CourseSearchAreaTab from '@/components/organisms/course-search/area-tab';
import CourseSearchLocationTab from '@/components/organisms/course-search/location-tab';

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
          name: 'area',
          label: 'エリアより検索',
          component: CourseSearchAreaTab,
        },
        {
          name: 'location',
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
  created() {
    this.$store.commit('courseSearchNavigator/resetSearchConditions');
  },
  methods: {
    goToSearchResult() {
      const activeTabIndex = this.$refs.tabContents.activeIndex;
      const activeTab = this.tabs.find((tab, index) => index === activeTabIndex).name;
      let currentLocation = null;

      if (activeTab === 'location') {
        // TODO: 現在位置を取得してください
        currentLocation = {
          latitude: 139.77987364521508,
          longitude: 35.67688853405839,
        };
      }

      this.$store.dispatch('courseSearchNavigator/push', {
        extends: SearchResult,
        onsNavigatorProps: {
          title: 'コース検索結果',
          currentLocation,
        },
      });
    },
  },
};
</script>
