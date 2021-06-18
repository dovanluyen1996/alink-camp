<template>
  <v-ons-page>
    <custom-toolbar :title="title" />
    <div class="content">
      <no-data v-if="courses.length === 0">
        条件に合うコースが見つかりません
      </no-data>

      <course-list
        v-else
        :courses="courses"
        :current-location="currentLocation"
        @click="goToCourseShow"
      />
    </div>
  </v-ons-page>
</template>

<script>
// components
import NoData from '@/components/organisms/no-data';
import CourseList from '@/components/organisms/course-list';

// pages
import CourseShow from '@/views/courses/show';

export default {
  name: 'CourseSearchResult',
  components: {
    NoData,
    CourseList,
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
  },
  data() {
    return {
      courses: [
        {
          id: 1,
          poi_id: 1,
          jalan_code: 'shintoukyou',
          name: '新東京都民ゴルフ場',
          name_kana: 'シントウキョウトミンゴルフジョウ',
          address: '東京都足立区新田１丁目１５−１',
          latitude: 139.7399279567286,
          longitude: 35.781503655083256,
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
          latitude: 139.78006801778602,
          longitude: 35.67992838270606,
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
    goToCourseShow(course) {
      console.log(course);
      this.$store.dispatch('courseSearchNavigator/push', CourseShow);
    },
  },
};
</script>
