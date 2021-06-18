<template>
  <v-ons-page>
    <custom-toolbar title="コース検索" />
    <div class="content">
      <search-field
        v-model="searchText"
        @goToSearchResult="goToSearchResult"
      />

      <course-list
        v-if="courses.length > 0"
        :courses="courses"
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
import ConditionsSearch from '@//views/course-search/conditions-search';

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
      courses: [
        {
          id: 1,
          poi_id: 1,
          jalan_code: 'shintoukyou',
          name: '新東京都民ゴルフ場',
          name_kana: 'シントウキョウトミンゴルフジョウ',
          address: '東京都足立区新田１丁目１５−１',
          latitude: 0,
          longitude: 0,
          phone: '000-0000-0000',
          phone2: '000-0000-0000',
          url: 'http://',
          jalan_description: 'じゃらんコース紹介',
          jalan_image_path: 'jaran_image_path',
          jalan_url: 'jaran_url',
          note: '備考',
        },
        {
          id: 2,
          poi_id: 2,
          jalan_code: 'shintoukyou',
          name: '新東京都民ゴルフ場',
          name_kana: 'シントウキョウトミンゴルフジョウ',
          address: '東京都足立区新田１丁目１５−１',
          latitude: 0,
          longitude: 0,
          phone: '000-0000-0000',
          phone2: '000-0000-0000',
          url: 'http://',
          jalan_description: 'じゃらんコース紹介',
          jalan_image_path: 'jaran_image_path',
          jalan_url: 'jaran_url',
          note: '備考',
        },
      ],
    };
  },
  methods: {
    goToPrefecturesSearch() {
      this.$store.dispatch('courseSearchNavigator/push', PrefecturesSearch);
    },
    goToConditionsSearch() {
      this.$store.dispatch('courseSearchNavigator/push', ConditionsSearch);
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
