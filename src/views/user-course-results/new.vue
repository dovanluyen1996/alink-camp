<template>
  <v-ons-page>
    <custom-toolbar title="スコアの新規登録" />

    <div class="content">
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
              modifier="large--cta add rounded"
              v-show="isButtonShown"
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
  mounted() {
    document.addEventListener('click', this.onTapOutsideInput, false);
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  beforeDestroy() {
    document.removeEventListener('deviceready', this.onDeviceReady, false);
    document.removeEventListener('click', this.onTapOutsideInput, false);
    window.removeEventListener('native.keyboardshow', this.onKeyBoardShow);
    window.removeEventListener('native.keyboardhide', this.onKeyBoardHide);
  },
  computed: {
    courseName() {
      return this.userCourse ? this.userCourse.course.name : this.course.name;
    },
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
    onDeviceReady() {
      window.addEventListener('native.keyboardshow', this.onKeyBoardShow);
      window.addEventListener('native.keyboardhide', this.onKeyBoardHide);
    },
    onKeyBoardShow() {
      this.isButtonShown = false;
      let activeField = document.activeElement;
      activeField.scrollIntoView(true);
    },
    onKeyBoardHide() {
      this.isButtonShown = true;
    },
    onTapOutsideInput() {
      if (document.activeElement.tagName === 'BODY') {
        document.activeElement.blur();
      }
    }
  },
};
</script>
