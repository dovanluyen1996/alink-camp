<template>
  <div class="course-weather-header">
    <div
      class="course-name"
      @click="goToCourseDetail"
    >
      {{ course.name }}
      <img
        v-if="userCourse.isFavorited"
        src="@/assets/images/user/user-course/favorite.png"
        width="18px"
      >
    </div>
    <div class="course-address">
      {{ course.address }}
    </div>
  </div>
</template>

<script>
// pages
import CourseSearchIndexPage from '@/views/course-search/index';
import CourseShowPage from '@/views/courses/show';

import settings from '@/config/settings';

export default {
  name: 'CourseWeatherHeader',
  props: {
    userCourse: {
      type: Object,
      required: true,
    },
  },
  computed: {
    course() {
      return this.userCourse.course;
    },
  },
  methods: {
    goToCourseDetail() {
      this.$store.commit('appTabbar/setActiveIndex', settings.views.appTabbar.tabIndexes.courseSearch);
      this.$store.dispatch('courseSearchNavigator/reset', CourseSearchIndexPage);
      this.$store.dispatch('courseSearchNavigator/push', {
        extends: CourseShowPage,
        onsNavigatorProps: {
          course: this.course,
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_mixins.scss';

.course-name {
  @include title-style;

  display: inline-block;
  margin-bottom: 3px;
  text-align: left;
}

.course-address {
  color: #888;
}
</style>
