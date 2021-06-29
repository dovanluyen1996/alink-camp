<template>
  <v-ons-page>
    <custom-toolbar
      :title="title"
      subtitle="（予定日設定）"
    >
      <template #right>
        <delete-dialog-with-icon
          v-if="isCanDelete"
          :is-shown.sync="isShownDeleteDialog"
          @clickDelete="deletePlans"
        >
          この予定日設定を削除します。<br>
          よろしいですか？
        </delete-dialog-with-icon>
      </template>
    </custom-toolbar>

    <div class="content">
      <content-with-footer>
        <validation-observer
          v-slot="{ handleSubmit }"
        >
          <validation-provider
            v-slot="{ errors }"
            rules="required"
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
              @click="handleSubmit(settingPlan)"
            >
              設定完了
            </v-ons-button>
          </template>
        </validation-observer>
      </content-with-footer>
    </div>
  </v-ons-page>
</template>

<script>
// components
import DeleteDialogWithIcon from '@/components/organisms/dialog/delete-dialog-with-icon';
import DateField from '@/components/organisms/form/date-field';
import TimeField from '@/components/organisms/form/time-field';
import ContentWithFooter from '@/components/organisms/content-with-footer';

export default {
  name: 'CoursePlans',
  components: {
    DeleteDialogWithIcon,
    DateField,
    TimeField,
    ContentWithFooter,
  },
  props: {
    course: {
      type: Object,
      required: true,
      default: () => {},
    },
    userCourse: {
      type: Object,
      required: true,
      default: () => {},
    },
    userCoursePlan: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      dateValue: '',
      timeValue: '',
      isShownDeleteDialog: false,
      error: null,
    };
  },
  computed: {
    title() {
      return this.course.name;
    },
    isPersisted() {
      return Object.keys(this.userCoursePlan).length === 0 ? false : true;
    },
  },
  created() {
    this.getPlanInfo();
  },
  methods: {
    getPlanInfo() {
      if (!this.userCoursePlan.targetAt) return;

      this.dateValue = this.$helpers.toLongStringWithoutDayOfWeek(this.userCoursePlan.targetAt);
      this.timeValue = this.$helpers.toTimeString(this.userCoursePlan.targetAt);
    },
    openDeleteDialog() {
      this.isShownDeleteDialog = true;
    },
    closeDeleteDialog() {
      this.isShownDeleteDialog = false;
    },
    deletePlans() {
      console.log('delete plans');
      this.isShownDeleteDialog = false;
    },
    async settingPlan() {
      if (this.isPersisted) {
        await this.updateUserCoursePlan();
      } else {
        await this.createUserCoursePlan();
      }

      // 現状、UserCourseのStoreを使っています。
      // そのため、UserCoursePlanを変更する時に、UserCourseのStoreを変更しないといけないです。
      await this.$store.dispatch('models/userCourse/getUserCourses');
      await this.$store.dispatch('courseSearchNavigator/pop');
    },
    async updateUserCoursePlan() {
      const params = {
        targetAt: this.targetAt(),
      };

      await this.$store.dispatch('models/userCoursePlan/updateUserCoursePlan', {
        userCourseId: this.userCourse.id,
        userCoursePlanId: this.userCoursePlan.id,
        params,
      });
    },
    async createUserCoursePlan() {
      let userCourseId = this.userCourse.id;

      // If UserCourse is not exsited, create UserCourse
      const isUserCourseNotExisted = Object.keys(this.userCourse).length === 0;
      if (isUserCourseNotExisted) {
        await this.createUserCourse();
        const createdUserCourse = this.$store.getters['models/userCourse/findByCourseId'](this.course.id);
        userCourseId = createdUserCourse && createdUserCourse.id;
      }

      // Create UserCoursePlan
      const params = {
        courseId: this.course.id,
        targetAt: this.targetAt(),
      };
      await this.$store.dispatch('models/userCoursePlan/createUserCoursePlan', {
        userCourseId,
        params,
      });
    },
    async createUserCourse() {
      const params = {
        courseId: this.course.id,
      };

      await this.$store.dispatch('models/userCourse/createUserCourse', params);
    },
    targetAt() {
      return `${this.dateValue} ${this.timeValue}`;
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
