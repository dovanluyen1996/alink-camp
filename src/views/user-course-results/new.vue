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
              :disabled="isButtonDisable"
              @click="handleSubmit(createUserCourseResult)"
            >
              保存
            </v-ons-button>
          </template>
        </content-with-footer>
      </validation-observer>
    </div>
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

export default {
  name: 'ScoresResultNew',
  components: {
    CourseName,
    UserCourseResultsTargetDateField,
    UserCourseResultsScoresField,
    UserCourseResultsImageField,
    UserCourseResultsNoteField,
    ContentWithFooter,
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
      isButtonDisable: false,
    };
  },
  computed: {
    courseName() {
      return this.userCourse ? this.userCourse.course.name : this.course.name;
    },
  },
  methods: {
    async createUserCourseResult() {
      this.isButtonDisable = true;

      await this.$store.dispatch('models/userCourseResult/createUserCourseResult', {
        userCourseId: this.userCourse.id,
        params: this.userCourseResult,
      })
        .then(() => {
          // TODO: 登録後のダイアログやトーストなどの表示
        })
        .catch((err) => {
          console.log(err);
        });

      this.isButtonDisable = false;
      this.$store.dispatch('scoresNavigator/pop');
    },
  },
};
</script>
