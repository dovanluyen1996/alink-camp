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
  computed: {
    courses() {
      return this.$store.getters['models/course/all'];
    },
  },
  methods: {
    goToCourseShow(course) {
      console.log('goToCourseShow', course);
      this.$store.dispatch('courseSearchNavigator/push', CourseShow);
    },
  },
};
</script>
