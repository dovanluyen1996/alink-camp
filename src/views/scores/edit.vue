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

    <v-ons-card class="course-weather-and-image">
      <v-ons-row class="course-weather-and-image-row">
        <user-course-result-weather />
        <user-course-result-image v-model="image" />
      </v-ons-row>
    </v-ons-card>

    <user-course-result-target-date-field
      v-model="target_date"
      title="プレイ日"
    />
    <user-course-result-scores-field
      :total-score.sync="total_score"
      :patting-score.sync="patting_score"
    />
    <user-course-result-note-field v-model="note" />

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
import UserCourseResultTargetDateField from '@/components/organisms/scores/result/target-date-field';
import UserCourseResultScoresField from '@/components/organisms/scores/result/scores-field';
import UserCourseResultWeather from '@/components/organisms/scores/result/weather';
import UserCourseResultImage from '@/components/organisms/scores/result/image';
import UserCourseResultNoteField from '@/components/organisms/scores/result/note-field';
import FixedFooter from '@/components/organisms/fixed-footer';

export default {
  name: 'ScoresResultNew',
  components: {
    DeleteDialogWithIcon,
    CourseName,
    UserCourseResultTargetDateField,
    UserCourseResultScoresField,
    UserCourseResultWeather,
    UserCourseResultImage,
    UserCourseResultNoteField,
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

<style lang="scss" scoped>
.course-weather-and-image {
  text-align: center;
}

@media screen and (max-width: 374px) {
  .course-weather-and-image-row {
    flex-direction: column;
  }

  .course-weather-col {
    margin-right: 0;
    margin-bottom: 15px;
  }
}

@media screen and (min-width: 375px) {
  .course-weather-col {
    margin-right: 15px;
  }

  .course-image-col {
    flex: 0 0 50%;
    max-width: 50%;
  }
}
</style>
