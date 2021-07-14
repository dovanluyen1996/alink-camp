<template>
  <v-ons-page>
    <custom-toolbar title="サマリー情報" />

    <div class="content">
      <loading :visible="isLoading" />
      <content-with-footer>
        <course-name :course-name="userCourse.course.name" />
        <v-ons-card>
          <div class="content">
            <user-course-results-summary-chart />

            <user-course-results-course-weather
              :weathers="weathers"
            />

            <user-course-results-list
              :user-course-results="userCourseResults"
              @clickUserCourseResult="showEditConfirmDialog"
            />
          </div>
        </v-ons-card>
        <template #footer>
          <v-ons-button
            modifier="large--cta add rounded"
            @click="goToUserCourseResultsNew"
          >
            スコア追加
          </v-ons-button>
        </template>
      </content-with-footer>
    </div>

    <v-ons-alert-dialog :visible.sync="isVisibleEditConfirmDialog">
      <template #title>
        編集確認
      </template>

      編集により、登録したスコアデータ、写真が削除される可能性があります。<br>
      よろしいすか？

      <template #footer>
        <v-ons-button
          modifier="quiet quiet--dark"
          @click="hideEditConfirmDialog()"
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
import UserCourseResultsSummaryChart from '@/components/organisms/user-course-results/summary-chart';
import UserCourseResultsCourseWeather from '@/components/organisms/user-course-results/course-weather';
import UserCourseResultsList from '@/components/organisms/user-course-results/result-list';
import ContentWithFooter from '@/components/organisms/content-with-footer';

// pages
import UserCourseResultsNew from '@/views/user-course-results/new';
import UserCourseResultsEdit from '@/views/user-course-results/edit';

export default {
  name: 'ScoreSummary',
  components: {
    CourseName,
    UserCourseResultsSummaryChart,
    UserCourseResultsCourseWeather,
    UserCourseResultsList,
    ContentWithFooter,
  },
  props: {
    userCourse: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isVisibleEditConfirmDialog: false,
      selectedUserCourseResult: null,
    };
  },
  computed: {
    userCourseResults() {
      return this.$store.getters['models/userCourseResult/all'];
    },
    isLoading() {
      return this.$store.getters['models/userCourseResult/isLoading'];
    },
    weathers() {
      return this.userCourseResults.map(userCourseResult =>
        (userCourseResult.weather ? JSON.parse(userCourseResult.weather) : null)
      );
    },
  },
  async created() {
    await this.getUserCourseResults();
  },
  methods: {
    async getUserCourseResults() {
      await this.$store.dispatch('models/userCourseResult/getUserCourseResults', this.userCourse.id);
    },
    showEditConfirmDialog(userCourseResult) {
      this.isVisibleEditConfirmDialog = true;
      this.selectedUserCourseResult = userCourseResult;
    },
    hideEditConfirmDialog() {
      this.isVisibleEditConfirmDialog = false;
      this.selectedUserCourseResult = null;
    },
    goToUserCourseResultsEdit() {
      this.$store.dispatch('scoresNavigator/push', {
        extends: UserCourseResultsEdit,
        onsNavigatorProps: {
          userCourse: this.userCourse,
          userCourseResult: this.selectedUserCourseResult,
        },
      });
      this.hideEditConfirmDialog();
    },
    goToUserCourseResultsNew() {
      this.$store.dispatch('scoresNavigator/push', {
        extends: UserCourseResultsNew,
        onsNavigatorProps: {
          userCourse: this.userCourse,
        },
      });
    },
  },
};
</script>
