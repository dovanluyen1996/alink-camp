<template>
  <v-ons-page>
    <custom-toolbar title="サマリー情報" />

    <div class="content">
      <content-with-footer>
        <course-name :course-name="course.name" />
        <v-ons-card>
          <div class="content">
            <user-course-results-summary-chart />

            <user-course-results-course-weather />

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
      isVisibleEditConfirmDialog: false,
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
    showEditConfirmDialog(userCourseResult) {
      this.isVisibleEditConfirmDialog = true;
      this.selectedUserCourseResults = userCourseResult;
    },
    hideEditConfirmDialog() {
      this.isVisibleEditConfirmDialog = false;
      this.selectedUserCourseResults = null;
    },
    goToUserCourseResultsEdit() {
      this.$store.dispatch('scoresNavigator/push', {
        extends: UserCourseResultsEdit,
        onsNavigatorProps: {
          course: this.course,
          userCourseResult: this.selectedUserCourseResults,
        },
      });
      this.hideEditConfirmDialog();
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
