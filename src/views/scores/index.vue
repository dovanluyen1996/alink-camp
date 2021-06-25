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

      <div v-else>
        <course-list
          :courses="courses"
          @click="goToScoreSummary"
        />

        <fixed-footer>
          <v-ons-button
            modifier="large--cta add rounded"
            @click="goToCourseSearch"
          >
            別コースでスコア追加
          </v-ons-button>
        </fixed-footer>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
// components
import NoData from '@/components/organisms/no-data';
import CourseList from '@/components/organisms/course-list.vue';
import FixedFooter from '@/components/organisms/fixed-footer';

// pages
import Summary from '@/views/scores/summary';

export default {
  name: 'ScoresIndex',
  components: {
    NoData,
    CourseList,
    FixedFooter,
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
    goToScoreSummary(course) {
      this.$store.dispatch('scoresNavigator/push', {
        extends: Summary,
        onsNavigatorProps: {
          course,
        },
      });
    },
    goToCourseSearch() {
      this.$store.commit('appTabbar/setActiveIndexFromTabName', 'courseSearch');
    },
  },
};
</script>
