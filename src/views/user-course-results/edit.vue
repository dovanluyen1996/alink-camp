<template>
  <v-ons-page>
    <custom-toolbar :title="title | moment('YYYY/MM/DD')">
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

    <div class="content">
      <content-with-footer>
        <course-name :course-name="course.name" />

        <v-ons-card class="course-weather-and-image">
          <v-ons-row class="course-weather-and-image-row">
            <user-course-result-weather />
            <user-course-result-image v-model="tempUserCourseResult.image" />
          </v-ons-row>
        </v-ons-card>

        <user-course-result-target-date-field
          v-model="tempUserCourseResult.targetDate"
          title="プレイ日"
        />
        <user-course-result-scores-field
          :total-score.sync="tempUserCourseResult.totalScore"
          :patting-score.sync="tempUserCourseResult.pattingScore"
        />
        <user-course-result-note-field v-model="tempUserCourseResult.note" />

        <template #footer>
          <v-ons-button
            modifier="large--cta add rounded"
            @click="submitScore"
          >
            保存
          </v-ons-button>
        </template>
      </content-with-footer>
    </div>
  </v-ons-page>
</template>

<script>
import settings from '@/config/settings';

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
      tempUserCourseResult: {
        targetDate: this.userCourseResult.targetDate,
        totalScore: this.userCourseResult.totalScore,
        pattingScore: this.userCourseResult.pattingScore,
        image: this.userCourseResult.image,
        note: this.userCourseResult.note,
      },
      isShownDeleteDialog: false,
    };
  },
  computed: {
    title() {
      return this.userCourseResult.targetDate;
    },
  },
  methods: {
    getUserCourse() {
      return this.$store.getters['models/userCourse/findByCourseId'](this.course.id);
    },
    async deleteScore() {
      this.isShownDeleteDialog = false;

      await this.$store.dispatch('models/userCourseResult/destroyUserCourseResult', {
        userCourseId: this.getUserCourse().id,
        userCourseResultId: this.userCourseResult.id,
      })
        .then(() => {
          this.$ons.notification.toast('削除しました', settings.toastSetting);
          this.$store.dispatch('scoresNavigator/pop');
        })
        .catch((err) => {
          console.log(err);
        });
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
