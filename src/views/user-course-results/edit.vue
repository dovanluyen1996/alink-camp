<template>
  <v-ons-page>
    <custom-toolbar :title="userCourseResult.targetDate | moment('YYYY/MM/DD')">
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
              <user-course-result-weather
                v-if="weather"
                :weather="weather"
              />
              <v-ons-col
                v-else
                class="no-data"
              >
                <label width="150px">No Data</label>
              </v-ons-col>
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
      required: true,
    },
    userCourseResult: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tempUserCourseResult: { ...this.userCourseResult },
      isShownDeleteDialog: false,
      isButtonDisable: false,
    };
  },
  computed: {
    weather() {
      return JSON.parse(this.userCourseResult.weather);
    },
  },
  methods: {
    async deleteUserCourseResult() {
      this.isShownDeleteDialog = false;

      await this.$store.dispatch('models/userCourseResult/destroyUserCourseResult', {
        userCourseId: this.userCourse.id,
        userCourseResultId: this.userCourseResult.id,
      })
        .then(() => {
          // TODO: 削除後のダイアログやトーストなどの表示
          this.$store.dispatch('scoresNavigator/pop');
        })
        .catch((err) => {
          // TODO: 削除失敗のダイアログやトーストなどの表示
          console.log(err);
        });
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

.no-data {
  margin: auto;
  font-size: 16px;
  font-weight: bold;
}
</style>
