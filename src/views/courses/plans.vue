<template>
  <v-ons-page>
    <custom-toolbar title="予定日設定">
      <template
        v-if="isPersisted"
        #right
      >
        <delete-dialog-with-icon
          :is-shown.sync="deleteConfirmDialogVisible"
          @clickDelete="deleteUserCoursePlan"
        >
          この予定日設定を削除します。<br>
          よろしいですか？
        </delete-dialog-with-icon>
      </template>
    </custom-toolbar>

    <div class="content">
      <validation-observer
        v-slot="{ handleSubmit }"
      >
        <content-with-footer>
          <course-name :course-name="course.name" />
          <validation-provider
            v-slot="{ errors }"
            rules="required|required-future-day"
            name="プレイ予定日"
          >
            <date-field
              v-model="dateValue"
              title="プレイ予定日（必須）"
              placeholder="予定日を選択"
              help="※天気予報のPUSHは予報が確定してからになります"
              :errors="errors"
            />
          </validation-provider>
          <time-field
            v-model="timeValue"
            title="プレイ開始時刻"
            placeholder="時刻設定"
          />

          <template #footer>
            <v-ons-button
              modifier="large--cta rounded"
              @click="handleSubmit(settingUserCoursePlan)"
            >
              設定完了
            </v-ons-button>
          </template>
        </content-with-footer>
      </validation-observer>
    </div>
  </v-ons-page>
</template>

<script>
// components
import DateField from '@/components/organisms/form/date-field';
import TimeField from '@/components/organisms/form/time-field';
import ContentWithFooter from '@/components/organisms/content-with-footer';
import CourseName from '@/components/organisms/course-name';
import DeleteDialogWithIcon from '@/components/organisms/dialog/delete-dialog-with-icon';

export default {
  name: 'CoursePlans',
  components: {
    DateField,
    TimeField,
    ContentWithFooter,
    CourseName,
    DeleteDialogWithIcon,
  },
  props: {
    course: {
      type: Object,
      required: true,
    },
    userCoursePlan: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      dateValue: '',
      timeValue: '',
      deleteConfirmDialogVisible: false,
      userCourse: {},
    };
  },
  computed: {
    isPersisted() {
      return this.$helpers.isPresentObject(this.userCoursePlan);
    },
    targetAt() {
      return `${this.dateValue} ${this.timeValue}`;
    },
  },
  created() {
    this.getUserCourse();
    this.getPlanInfo();
  },
  methods: {
    getUserCourse() {
      this.userCourse = this.$store.getters['models/userCourse/findByCourseId'](this.course.id) || {};
    },
    getPlanInfo() {
      if (!this.isPersisted) return;

      // yyyy-mm-ddのフォーマットを使わないといけないです。
      this.dateValue = this.$helpers.localDateWithHyphenFrom(this.userCoursePlan.targetAt);
      this.timeValue = this.$helpers.localTimeFrom(this.userCoursePlan.targetAt);
    },
    closeDeleteConfirmDialog() {
      this.deleteConfirmDialogVisible = false;
    },
    async deleteUserCoursePlan() {
      this.closeDeleteConfirmDialog();

      await this.destroyUserCoursePlan();
      await this.$store.dispatch('courseSearchNavigator/pop');
    },
    async settingUserCoursePlan() {
      if (this.isPersisted) {
        await this.updateUserCoursePlan();
      } else {
        await this.createUserCoursePlan();
      }

      await this.$store.dispatch('courseSearchNavigator/pop');
    },
    async updateUserCoursePlan() {
      const params = {
        targetAt: this.targetAt,
      };
      await this.$store.dispatch('models/userCoursePlan/updateUserCoursePlan', {
        userCourseId: this.userCourse.id,
        userCoursePlanId: this.userCoursePlan.id,
        params,
      });
    },
    async createUserCoursePlan() {
      let userCourseId = null;

      // If UserCourse is not exsited, create UserCourse
      const isUserCourseNotExisted = this.$helpers.isEmptyObject(this.userCourse);
      if (isUserCourseNotExisted) {
        await this.createUserCourse();
        const createdUserCourse = this.$store.getters['models/userCourse/findByCourseId'](this.course.id);
        // If can not create UserCourse, dont create UserCoursePlan
        if (!createdUserCourse) return;
        // Get created UserCourse.id
        userCourseId = createdUserCourse.id;
      } else {
        userCourseId = this.userCourse.id;
      }

      // Create UserCoursePlan
      const params = {
        courseId: this.course.id,
        targetAt: this.targetAt,
      };
      await this.$store.dispatch('models/userCoursePlan/createUserCoursePlan', {
        userCourseId,
        params,
      });
    },
    async destroyUserCoursePlan() {
      await this.$store.dispatch('models/userCoursePlan/destroyUserCoursePlan', {
        userCourseId: this.userCourse.id,
        userCoursePlanId: this.userCoursePlan.id,
      });
    },
    async createUserCourse() {
      const params = {
        courseId: this.course.id,
      };
      await this.$store.dispatch('models/userCourse/createUserCourse', params);
    },
  },
};
</script>

<style scoped lang="scss">
/deep/ {
  .card {
    text-align: center;
  }

  .custom-input-date {
    width: auto;
    min-width: 180px;
  }

  .date-field-help {
    text-align: left;
  }
}
</style>
