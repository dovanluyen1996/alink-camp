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
              v-show="isButtonShown"
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

    <completed-dialog
      :action="action"
      :is-visible="completedDialogVisible"
      @close="closeCompletedDialog"
    />
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
import CompletedDialog from '@/components/organisms/dialog/completed-dialog';

// pages
import ScoresIndexPage from '@/views/scores/index';

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
    CompletedDialog,
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
      completedDialogVisible: false,
      action: '',
      isButtonShown: true,
    };
  },
  computed: {
    userCourseResultSize() {
      return this.$store.getters['models/userCourseResult/size'];
    },
    weather() {
      return this.userCourseResult.weather;
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
    showCompletedDialog(action) {
      this.action = action;
      this.completedDialogVisible = true;
    },
    closeCompletedDialog() {
      this.completedDialogVisible = false;
      const userCourseResultSize = this.$store.getters['models/userCourseResult/size'];

      if (userCourseResultSize) {
        this.$store.dispatch('scoresNavigator/pop');
      } else {
        this.$store.dispatch('scoresNavigator/reset', ScoresIndexPage);
      }
    },
    async deleteUserCourseResult() {
      this.isShownDeleteDialog = false;

      await this.$store.dispatch('models/userCourseResult/destroyUserCourseResult', {
        userCourseId: this.userCourse.id,
        userCourseResultId: this.userCourseResult.id,
      })
        .then(() => {
          this.showCompletedDialog('deleteResult');
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
          this.showCompletedDialog('updateResult');
        })
        .catch((err) => {
          // TODO: 更新失敗のダイアログやトーストなどの表示
          console.log(err);
        });

      this.isButtonDisable = false;
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

<style lang="scss" scoped>
.course-weather-and-image {
  text-align: center;
}

.course-weather-and-image-row {
  flex-direction: column;
}

.course-weather-col {
  margin-right: 0;
  margin-bottom: 15px;
}

@media screen and (min-width: 320px) {
  .course-weather-and-image-row {
    flex-direction: row;
  }

  .course-weather-col {
    flex: 0 0 50%;
    max-width: 50%;
    padding-right: 0;
    margin-bottom: 0;
  }

  .course-image-col {
    flex: 0 0 50%;
    max-width: 50%;
    padding-left: 5px;

    .share-button {
      min-width: 90%;
    }
  }
}

@media screen and (min-width: 375px) {
  .course-weather-col {
    padding-right: 15px;
  }

  .course-image-col {
    padding-left: 0;

    .share-button {
      min-width: 140px;
    }
  }
}

.no-data {
  margin: auto;
  font-size: 16px;
  font-weight: bold;
}

/deep/ {
  @media screen and (min-width: 320px) {
    .course-image-col {
      .share-button {
        min-width: 95%;
      }
    }
  }

  @media screen and (min-width: 375px) {
    .course-image-col {
      .share-button {
        min-width: 140px;
      }
    }
  }
}
</style>
