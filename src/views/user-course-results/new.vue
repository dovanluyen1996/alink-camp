<template>
  <v-ons-page>
    <custom-toolbar title="スコアの新規登録" />

    <div class="content">
      <loading :visible="isLoading" />
      <validation-observer v-slot="{ handleSubmit }">
        <content-with-footer>
          <course-name :course-name="courseName" />
          <user-course-results-target-date-field
            v-model="userCourseResult.targetDate"
            title="プレイ日（必須）"
          />
          <user-course-results-scores-field
            :total-score.sync="userCourseResult.totalScore"
            :patting-score.sync="userCourseResult.pattingScore"
          />
          <user-course-results-image-field
            v-model="userCourseResult.image"
            title="写真"
          />
          <user-course-results-note-field v-model="userCourseResult.note" />
          <template #footer>
            <v-ons-button
              v-show="isButtonShown"
              modifier="large--cta add rounded"
              :disabled="isButtonDisable"
              @click="handleSubmit(createUserCourseResult)"
            >
              保存
            </v-ons-button>
          </template>
        </content-with-footer>
      </validation-observer>
    </div>
    <completed-dialog
      action="createResult"
      :is-visible="completedDialogVisible"
      @close="closeCompletedDialog"
    />
  </v-ons-page>
</template>

<script>
// components
import CourseName from '@/components/organisms/course-name';
import UserCourseResultsTargetDateField from '@/components/organisms/user-course-results/target-date-field';
import UserCourseResultsScoresField from '@/components/organisms/user-course-results/scores-field';
import UserCourseResultsImageField from '@/components/organisms/form/image-field';
import UserCourseResultsNoteField from '@/components/organisms/user-course-results/note-field';
import ContentWithFooter from '@/components/organisms/content-with-footer';
import CompletedDialog from '@/components/organisms/dialog/completed-dialog';

// pages
import UserCourseResultsIndex from '@/views/user-course-results/index';

export default {
  name: 'ScoresResultNew',
  components: {
    CourseName,
    UserCourseResultsTargetDateField,
    UserCourseResultsScoresField,
    UserCourseResultsImageField,
    UserCourseResultsNoteField,
    ContentWithFooter,
    CompletedDialog,
  },
  props: {
    course: {
      type: Object,
      default: () => {},
    },
    userCourse: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      userCourseResult: {
        targetDate: '',
        totalScore: '',
        pattingScore: '',
        image: '',
        note: '',
      },
      isButtonShown: true,
      isButtonDisable: false,
      completedDialogVisible: false,
      userCourseResultSize: 0,
    };
  },
  computed: {
    courseName() {
      return this.userCourse ? this.userCourse.course.name : this.course.name;
    },
    isLoading() {
      return this.$store.getters['models/userCourseResult/isLoading'] || this.$store.getters['models/userCourse/isLoading'];
    },
  },
  mounted() {
    window.addEventListener('keyboardDidShow', this.onKeyBoardShow);
    window.addEventListener('keyboardWillHide', this.onKeyBoardHide);
  },
  beforeDestroy() {
    window.removeEventListener('keyboardDidShow', this.onKeyBoardShow);
    window.removeEventListener('keyboardWillHide', this.onKeyBoardHide);
  },
  methods: {
    showCompletedDialog() {
      this.completedDialogVisible = true;
    },
    findCreatedUserCourse() {
      let userCourse = this.userCourse || {};
      if (this.$helpers.isEmptyObject(userCourse)) {
        userCourse = this.$store.getters['models/userCourse/findByCourseId'](this.course.id);
      }
      return userCourse;
    },
    closeCompletedDialog() {
      this.completedDialogVisible = false;
      this.gotoUserCourseResultsIndex();
    },
    gotoUserCourseResultsIndex() {
      this.$store.dispatch('scoresNavigator/pop');

      if (!this.userCourseResultSize) {
        this.$store.dispatch('scoresNavigator/push', {
          extends: UserCourseResultsIndex,
          onsNavigatorProps: {
            userCourse: this.findCreatedUserCourse(),
          },
        });
      }
    },
    async createUserCourseResult() {
      this.isButtonDisable = true;
      let userCourse = this.userCourse || {};
      this.userCourseResultSize = this.$store.getters['models/userCourseResult/size'];

      if (this.$helpers.isEmptyObject(userCourse)) userCourse = await this.createdUserCourse();
      await this.$store.dispatch('models/userCourseResult/createUserCourseResult', {
        userCourseId: userCourse.id,
        params: this.userCourseResult,
      })
        .then(() => {
          this.showCompletedDialog();
        })
        .catch((err) => {
          console.log(err);
        });

      this.isButtonDisable = false;
    },
    async createUserCourse() {
      const params = {
        courseId: this.course.id,
      };
      await this.$store.dispatch('models/userCourse/createUserCourse', params);
    },
    async createdUserCourse() {
      try {
        await this.createUserCourse();
      } catch (error) {
        return {};
      }

      return this.$store.getters['models/userCourse/findByCourseId'](this.course.id);
    },
    onKeyBoardShow() {
      this.isButtonShown = false;

      // Scroll to selected input
      const activeField = document.activeElement;
      if (activeField) {
        activeField.scrollIntoView(true);
      }
    },
    onKeyBoardHide() {
      this.isButtonShown = true;
    },
  },
};
</script>
