<template>
  <v-ons-page>
    <custom-toolbar :title="title">
      <template #right>
        <delete-dialog-with-icon
          :is-shown.sync="isShownDeleteDialog"
          @clickDelete="deleteUserCourseResult"
        >
          このスコアデータを削除します。<br>
          よろしいですか？
        </delete-dialog-with-icon>
      </template>
    </custom-toolbar>

    <div class="content">
      <validation-observer v-slot="{ handleSubmit }">
        <content-with-footer>
          <course-name :course-name="userCourse.course.name" />

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

          <template #footer>
            <v-ons-button
              modifier="large--cta add rounded"
              :disabled="isButtonDisable"
              @click="handleSubmit(updateUserCourseResult)"
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
import DeleteDialogWithIcon from '@/components/organisms/dialog/delete-dialog-with-icon';
import CourseName from '@/components/organisms/course-name';
import UserCourseResultTargetDateField from '@/components/organisms/user-course-results/target-date-field';
import UserCourseResultScoresField from '@/components/organisms/user-course-results/scores-field';
import UserCourseResultWeather from '@/components/organisms/user-course-results/weather';
import UserCourseResultImage from '@/components/organisms/user-course-results/image';
import UserCourseResultNoteField from '@/components/organisms/user-course-results/note-field';
import ContentWithFooter from '@/components/organisms/content-with-footer';

export default {
  name: 'UserCourseResultsEdit',
  components: {
    DeleteDialogWithIcon,
    CourseName,
    UserCourseResultTargetDateField,
    UserCourseResultScoresField,
    UserCourseResultWeather,
    UserCourseResultImage,
    UserCourseResultNoteField,
    ContentWithFooter,
  },
  props: {
    userCourse: {
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
      isButtonDisable: false,
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
    async updateUserCourseResult() {
      this.isButtonDisable = true;

      if (this.userCourseResult.image === this.tempUserCourseResult.image) {
        delete this.tempUserCourseResult.image;
      }

      await this.$store.dispatch('models/userCourseResult/updateUserCourseResult', {
        userCourseId: this.userCourse.id,
        userCourseResultId: this.userCourseResult.id,
        params: this.tempUserCourseResult,
      })
        .then(() => {
          // TODO: 更新後のダイアログやトーストなどの表示
          this.$store.dispatch('scoresNavigator/pop');
        })
        .catch((err) => {
          // TODO: 更新失敗のダイアログやトーストなどの表示
          console.log(err);
        });

      this.isButtonDisable = false;
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
