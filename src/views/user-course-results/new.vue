<template>
  <v-ons-page>
    <custom-toolbar title="スコアの新規登録" />

    <course-name :course-name="course.name" />
    <user-course-results-target-date-field
      v-model="target_date"
      title="プレイ日（必須）"
    />
    <user-course-results-scores-field
      :total-score.sync="total_score"
      :patting-score.sync="patting_score"
    />
    <user-course-results-image-field
      v-model="image"
      title="写真"
    />
    <user-course-results-note-field v-model="note" />

    <fixed-footer>
      <v-ons-button
        modifier="large--cta add rounded"
        @click="submitScore"
      >
        保存
      </v-ons-button>
    </fixed-footer>
  </v-ons-page>
</template>

<script>
// components
import CourseName from '@/components/organisms/course-name';
import UserCourseResultsTargetDateField from '@/components/organisms/user-course-results/target-date-field';
import UserCourseResultsScoresField from '@/components/organisms/user-course-results/scores-field';
import UserCourseResultsImageField from '@/components/organisms/form/image-field';
import UserCourseResultsNoteField from '@/components/organisms/user-course-results/note-field';
import FixedFooter from '@/components/organisms/fixed-footer';

export default {
  name: 'ScoresResultNew',
  components: {
    CourseName,
    UserCourseResultsTargetDateField,
    UserCourseResultsScoresField,
    UserCourseResultsImageField,
    UserCourseResultsNoteField,
    FixedFooter,
  },
  props: {
    course: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      target_date: '',
      total_score: '',
      patting_score: '',
      image: '',
      note: '',
    };
  },
  methods: {
    submitScore() {
      // TODO: スコアを保存
    },
  },
};
</script>
