<template>
  <v-ons-page>
    <custom-toolbar title="コース検索（地域）" />
    <div class="content">
      <prefecture-list
        fullscreen
        @click="goToSearchResult"
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
    goToSearchResult(prefecture) {
      console.log('goToSearchResult', prefecture);
      this.$store.dispatch('courseSearchNavigator/push', {
        extends: SearchResult,
        onsNavigatorProps: {
          title: `コース検索結果（${prefecture.text}）`,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
