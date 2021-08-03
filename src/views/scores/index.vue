<template>
  <v-ons-page @show="show">
    <custom-toolbar title="スコア" />
    <div class="content">
      <loading :visible="isLoading" />
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
import UserCourseResultsNew from '@/views/user-course-results/new';

export default {
  name: 'ScoresIndex',
  components: {
    NoData,
    CourseList,
    ContentWithFooter,
  },
  computed: {
    courses() {
      const userCourses = this.$store.getters['models/userCourse/hasFavoritedOrPlans'];

      return userCourses.map(userCourse => userCourse.course);
    },
    userCourseResultSize() {
      return this.$store.getters['models/userCourseResult/size'];
    },
    isLoading() {
      return this.$store.getters['models/userCourse/isLoading'];
    },
  },
  methods: {
    async show() {
      this.$store.dispatch('appTabbar/setLastVisitedAt', this.$helpers.localDateWithHyphenFrom(new Date()));
      await this.getUserCourses();
    },
    async getUserCourses() {
      await this.$store.dispatch('models/userCourse/getUserCourses');
    },
    getUserCourse(courseId) {
      return this.$store.getters['models/userCourse/findByCourseId'](courseId);
    },
    async getUserCourseResults(userCourseId) {
      await this.$store.dispatch('models/userCourseResult/getUserCourseResults', userCourseId);
    },
    async goToUserCourseResults(course) {
      const userCourse = this.getUserCourse(course.id);
      await this.getUserCourseResults(userCourse.id);

      if (this.userCourseResultSize) {
        this.goToUserCourseResultsIndex(userCourse);
      } else {
        this.goToUserCourseResultsNew(userCourse);
      }
    },
    goToUserCourseResultsIndex(userCourse) {
      this.$store.dispatch('scoresNavigator/push', {
        extends: UserCourseResultsIndex,
        onsNavigatorProps: {
          userCourse,
        },
      });
    },
    goToUserCourseResultsNew(userCourse) {
      this.$store.dispatch('scoresNavigator/push', {
        extends: UserCourseResultsNew,
        onsNavigatorProps: {
          userCourse,
        },
      });
    },
    goToCourseSearch() {
      this.$store.commit('appTabbar/setActiveIndexFromTabName', 'courseSearch');
    },
  },
};
</script>
