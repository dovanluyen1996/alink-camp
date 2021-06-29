<template>
  <v-ons-page>
    <custom-toolbar :title="title" />
    <div class="content">
      <div class="course-show-header">
        <ons-button
          :configured="is_favorited"
          modifier="large rounded"
          @click="toggleFavorite"
        >
          {{ favoriteButtonText }}
        </ons-button>
        <ons-button
          :configured="userCoursePlan"
          modifier="large rounded"
          @click="goToCoursePlans"
        >
          {{ plansButtonText }}
        </ons-button>
        <ons-button
          modifier="large rounded"
          @click="goToScore"
        >
          スコア状況
        </ons-button>
      </div>

      <div class="course-show">
        <card-with-tab
          :tabs="tabs"
        />
      </div>
    </div>
  </v-ons-page>
</template>

<script>
// components
import CardWithTab from '@/components/organisms/card-with-tab';

// tab contents
import CoursesForecastTab from '@/components/organisms/courses/forecast-tab';
import CoursesInformationTab from '@/components/organisms/courses/information-tab';

// pages
import CoursePlans from '@/views/courses/plans/';

export default {
  name: 'CourseShow',
  components: {
    CardWithTab,
  },
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      title: '〇〇ゴルフ場',
      is_favorited: true,
      tabs: [
        {
          label: '天気予報詳細',
          component: CoursesForecastTab,
        },
        {
          label: '詳細情報',
          component: CoursesInformationTab,
        },
      ],
    };
  },
  computed: {
    favoriteButtonText() {
      return this.is_favorited ? 'お気に入り追加済' : 'お気に入り追加';
    },
    plansButtonText() {
      return this.userCoursePlan ? `予定日：${this.$helpers.toLongStringWithoutDayOfWeek(this.userCoursePlan.targetAt)}` : '予定日設定';
    },
    userCourse() {
      return this.$store.getters['models/userCourse/findByCourseId'](this.course.id);
    },
    userCoursePlan() {
      return this.userCourse && this.userCourse.userCoursePlans[0];
    },
  },
  async created() {
    // TODO: コース天気TOP画面を実装したら、削除します。
    await this.getUserCourses();
  },
  async created() {
    await this.getCourse();
  },
  methods: {
    toggleFavorite() {
      this.is_favorited = !this.is_favorited;
    },
    goToCoursePlans() {
      this.$store.dispatch('courseSearchNavigator/push', {
        extends: CoursePlans,
        onsNavigatorProps: {
          course: this.course,
          userCourse: this.userCourse || {},
          userCoursePlan: this.userCoursePlan || {},
        },
      });
    },
    goToScore() {
      console.log('goToScore');
    },
    async getCourse() {
      await this.$store.dispatch('course/getChoosenCourse', this.course.id);
    },
    // TODO: user_course_plan情報を取得するために、UserCourse一覧は必要です。
    // UserCourse一覧はコース天気画面でUserCourseを取得して、Storeに保存します。
    // この画面でUserCourseのStoreを使って、user_course_plan情報を取得します。
    //
    // => コース天気TOP画面を実装したら、削除します。
    async getUserCourses() {
      await this.$store.dispatch('models/userCourse/getUserCourses');
    },
  },
};
</script>

<style scoped lang="scss">
.course-show-header {
  margin: 30px 0 35px;

  .button {
    width: 75%;
    margin-right: auto;
    margin-bottom: 16px;
    margin-left: auto;

    &[configured] {
      color: inherit;
      background: #d9d9d9;
    }
  }
}
</style>
