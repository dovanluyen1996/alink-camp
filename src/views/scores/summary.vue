<template>
  <v-ons-page>
    <custom-toolbar title="サマリー情報" />
    <course-name :course-name="course.name" />
    <v-ons-card>
      <div class="content">
        <score-summary-chart />

        <course-weather />

        <v-ons-list>
          <v-ons-list-item
            v-for="userCourseResult in userCourseResults"
            :key="userCourseResult.id"
            modifier="chevron"
            @click="goToResultEdit(userCourseResult)"
          >
            <div class="center user-course-result">
              <span>{{ displayTargetDate(userCourseResult.targetDate) }}</span>
            </div>
          </v-ons-list-item>
        </v-ons-list>
      </div>
    </v-ons-card>
    <fixed-footer>
      <v-ons-button
        modifier="large--cta add rounded"
        @click="goToResultCreate"
      >
        スコア追加
      </v-ons-button>
    </fixed-footer>
  </v-ons-page>
</template>

<script>
// components
import CourseName from '@/components/organisms/course-name';
import ScoreSummaryChart from '@/components/organisms/scores/summary-chart';
import CourseWeather from '@/components/organisms/scores/course-weather';
import FixedFooter from '@/components/organisms/fixed-footer';

export default {
  name: 'ScoreSummary',
  components: {
    CourseName,
    ScoreSummaryChart,
    CourseWeather,
    FixedFooter,
  },
  props: {
    course: {
      type: Object,
      default: () => {},
      required: true,
    },
    userCourseId: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  computed: {
    userCourseResults() {
      return this.$store.getters['models/userCourseResult/all'];
    },
  },
  async created() {
    await this.getUserCourseResults();
  },
  methods: {
    async getUserCourseResults() {
      await this.$store.dispatch('models/userCourseResult/getUserCourseResults', this.userCourseId);
    },
    displayTargetDate(targetDate) {
      return this.$helpers.toLongString(targetDate);
    },
    goToResultEdit() {
      // TODO: issue#133 スコア編集画面に遷移
    },
    goToResultCreate() {
      // TODO: issue#134 スコア新規登録画面に遷移
    },
  },
};
</script>

<style lang="scss" scoped>
.user-course-result {
  justify-content: center;
}
</style>
