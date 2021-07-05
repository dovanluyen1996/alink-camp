<template>
  <v-ons-page>
    <custom-toolbar title="スコアの新規登録" />

    <div class="content">
      <content-with-footer>
        <!-- TODO: templateの中にtemplateがあるとvalidation-observerがうまく機能しない -->
        <!-- <validation-observer v-slot="{ handleSubmit }"> -->
        <course-name :course-name="course.name" />
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
            @click="createUserCourseResult"
          >
            保存
          </v-ons-button>
        </template>
        <!-- </validation-observer> -->
      </content-with-footer>
    </div>
  </v-ons-page>
</template>

<script>
import settings from '@/config/settings';

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
    userCourseId: {
      type: Number,
      default: null,
      require: true,
    },
    course: {
      type: Object,
      default: () => {},
      required: true,
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
    };
  },
  methods: {
    async createUserCourseResult() {
      await this.$store.dispatch('models/userCourseResult/createUserCourseResult', {
        userCourseId: this.userCourseId,
        params: this.userCourseResult,
      })
        .then(() => {
          this.$ons.notification.toast('登録しました', settings.toastSetting);
        })
        .catch((err) => {
          console.log(err);
        });

      this.$store.dispatch('scoresNavigator/pop');
    },
  },
};
</script>
