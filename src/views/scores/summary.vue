<template>
  <v-ons-page>
    <custom-toolbar title="サマリー情報" />
    <course-name :course-name="course.name" />
    <v-ons-card>
      <div class="content">
        <score-summary-chart />

        <course-weather />

        <user-course-results
          :user-course-results="userCourseResults"
          @clickUserCourseResult="showEditDialog"
        />
      </div>
    </v-ons-card>
    <fixed-footer>
      <v-ons-button
        modifier="large--cta add rounded"
        @click="goToUserCourseResultsNew"
      >
        スコア追加
      </v-ons-button>
    </fixed-footer>

    <v-ons-alert-dialog
      :visible.sync="isVisibleEditDialog"
    >
      <template #title>
        編集確認
      </template>

      編集により、登録したスコアデータ、写真が削除される可能性があります。<br>
      よろしいすか？

      <template #footer>
        <v-ons-button
          modifier="quiet quiet--dark"
          @click="cancelGoToUserCourseResultsEdit()"
        >
          キャンセル
        </v-ons-button>
        <v-ons-button
          @click="goToUserCourseResultsEdit"
        >
          編集する
        </v-ons-button>
      </template>
    </v-ons-alert-dialog>
  </v-ons-page>
</template>

<script>
// components
import CourseName from '@/components/organisms/course-name';
import ScoreSummaryChart from '@/components/organisms/scores/summary-chart';
import CourseWeather from '@/components/organisms/scores/course-weather';
import UserCourseResults from '@/components/organisms/scores/user-course-results';
import FixedFooter from '@/components/organisms/fixed-footer';

// pages
import UserCourseResultsNew from '@/views/scores/new';
import UserCourseResultsEdit from '@/views/scores/edit';

export default {
  name: 'ScoreSummary',
  components: {
    CourseName,
    ScoreSummaryChart,
    CourseWeather,
    UserCourseResults,
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
  data() {
    return {
      isVisibleEditDialog: false,
      selectedUserCourseResults: null,
    };
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
    showEditDialog(userCourseResult) {
      this.isVisibleEditDialog = true;
      this.selectedUserCourseResults = userCourseResult;
    },
    cancelGoToUserCourseResultsEdit() {
      this.isVisibleEditDialog = false;
      this.selectedUserCourseResults = null;
    },
    goToUserCourseResultsEdit() {
      this.isVisibleEditDialog = false;
      this.$store.dispatch('scoresNavigator/push', {
        extends: UserCourseResultsEdit,
        onsNavigatorProps: {
          course: this.course,
          userCourseResult: this.selectedUserCourseResults,
        },
      });
    },
    goToUserCourseResultsNew() {
      this.$store.dispatch('scoresNavigator/push', {
        extends: UserCourseResultsNew,
        onsNavigatorProps: {
          course: this.course,
        },
      });
      // TODO: issue#134 スコア新規登録画面に遷移
    },
  },
};
</script>
