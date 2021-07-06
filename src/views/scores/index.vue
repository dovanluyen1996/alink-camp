<template>
  <v-ons-page @show="show">
    <custom-toolbar title="スコア" />
    <div class="content">
      <no-data v-if="courses.length === 0">
        <p>
          まだスコア登録がありません。<br>
          コース検索より、追加したいコースを選択してください
        </p>
        <template #actions>
          <v-ons-button
            modifier="cta"
            @click="goToCourseSearch"
          >
            早速コース検索
          </v-ons-button>
        </template>
      </no-data>

      <content-with-footer v-else>
        <course-list
          :courses="courses"
          @click="goToUserCourseResults"
        />

        <template #footer>
          <v-ons-button
            modifier="large--cta add rounded"
            @click="goToCourseSearch"
          >
            別コースでスコア追加
          </v-ons-button>
        </template>
      </content-with-footer>
    </div>
  </v-ons-page>
</template>

<script>
// components
import NoData from '@/components/organisms/no-data';
import CourseList from '@/components/organisms/course-list.vue';
import ContentWithFooter from '@/components/organisms/content-with-footer';

// pages
import UserCourseResultsIndex from '@/views/user-course-results/Index';

export default {
  name: 'ScoresIndex',
  components: {
    NoData,
    CourseList,
    ContentWithFooter,
  },
  computed: {
    courses() {
      const userCourses = this.$store.getters['models/userCourse/all'];

      return userCourses.map(userCourse => userCourse.course);
    },
  },
  methods: {
    async show() {
      await this.getUserCourses();
    },
    async getUserCourses() {
      await this.$store.dispatch('models/userCourse/getUserCourses');
    },
    getUserCourse(courseId) {
      return this.$store.getters['models/userCourse/findByCourseId'](courseId);
    },
    goToUserCourseResults(course) {
      const userCourseId = this.getUserCourse(course.id).id;

      this.$store.dispatch('scoresNavigator/push', {
        extends: UserCourseResultsIndex,
        onsNavigatorProps: {
          course,
          userCourseId,
        },
      });
    },
    goToCourseSearch() {
      this.$store.commit('appTabbar/setActiveIndexFromTabName', 'courseSearch');
    },
  },
};
</script>
