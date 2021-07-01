<template>
  <v-ons-page>
    <custom-toolbar :title="title">
      <template #right>
        <delete-dialog-with-icon
          :is-shown.sync="isShownDeleteDialog"
          @clickDelete="deleteScore"
        >
          このスコアデータを削除します。<br>
          よろしいですか？
        </delete-dialog-with-icon>
      </template>
    </custom-toolbar>

    <course-name :course-name="course.name" />
    <weather-and-image v-model="image" />
    <target-date-field
      v-model="target_date"
      title="プレイ日（必須）"
    />
    <scores-field
      :total-score.sync="total_score"
      :patting-score.sync="patting_score"
    />
    <note-field v-model="note" />

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
import DeleteDialogWithIcon from '@/components/organisms/dialog/delete-dialog-with-icon';
import CourseName from '@/components/organisms/course-name';
import TargetDateField from '@/components/organisms/scores/result/target-date-field';
import ScoresField from '@/components/organisms/scores/result/scores-field';
import WeatherAndImage from '@/components/organisms/scores/result/weather-and-image';
import NoteField from '@/components/organisms/scores/result/note-field';
import FixedFooter from '@/components/organisms/fixed-footer';

export default {
  name: 'ScoresResultNew',
  components: {
    DeleteDialogWithIcon,
    CourseName,
    TargetDateField,
    ScoresField,
    WeatherAndImage,
    NoteField,
    FixedFooter,
  },
  props: {
    course: {
      type: Object,
      default: () => {},
      required: true,
    },
    userCourseResult: {
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
      /* eslint-disable-next-line global-require */
      image: require('@/assets/images/course-sample.jpg'),
      note: '',
      isShownDeleteDialog: false,
    };
  },
  computed: {
    title() {
      // TODO: フォーマットしてください
      return this.userCourseResult.targetDate;
    },
  },
  methods: {
    deleteScore() {
      this.isShownDeleteDialog = false;
      // TODO: delete
    },
    submitScore() {
      // TODO: スコアを保存
    },
  },
};
</script>
