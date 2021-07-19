<template>
  <v-ons-page>
    <custom-toolbar title="コース検索（地域）" />
    <div class="content">
      <prefecture-list
        fullscreen
        @click="searchByPrefecture"
      />
    </div>
  </v-ons-page>
</template>

<script>
// components
import PrefectureList from '@/components/organisms/prefecture-list';

// pages
import SearchResult from '@/views/course-search/search-result';

export default {
  name: 'PrefecturesCourseSearch',
  components: {
    PrefectureList,
  },
  methods: {
    async searchByPrefecture(prefecture) {
      // Clear before search result
      this.$store.dispatch('models/course/resetCourses');

      const params = {
        prefecture_id: prefecture.value,
      };

      await this.$store.dispatch('models/course/getCourses', params);
      this.goToSearchResult(prefecture);
    },
    goToSearchResult(prefecture) {
      const searchConditions = { prefecture, type: 'prefecture' };

      this.$store.dispatch('courseSearchNavigator/push', {
        extends: SearchResult,
        onsNavigatorProps: {
          title: prefecture.text,
          searchConditions,
        },
      });
    },
  },
};
</script>
