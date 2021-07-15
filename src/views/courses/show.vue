<template>
  <v-ons-page>
    <custom-toolbar :title="course.name" />
    <div class="content">
      <div class="course-show-header">
        <v-ons-button
          :configured="is_favorited"
          modifier="large rounded"
          @click="toggleFavorite"
        >
          {{ favoriteButtonText }}
        </v-ons-button>
        <v-ons-button
          :configured="planned"
          modifier="large rounded"
          @click="goToCoursePlans"
        >
          {{ plansButtonText }}
        </v-ons-button>
        <v-ons-button
          modifier="large rounded"
          @click="goToScore"
        >
          スコア状況
        </v-ons-button>
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
      return this.planned ? `予定日：${this.$helpers.localDateFrom(this.userCoursePlan.targetAt)}` : '予定日設定';
    },
    userCourse() {
      return this.$store.getters['models/userCourse/findByCourseId'](this.course.id);
    },
    userCoursePlan() {
      if (!this.userCourse || this.$helpers.isEmptyObject(this.userCourse.userCoursePlans)) {
        return {};
      }

      const futureUserCoursePlan = this.userCourse.userCoursePlans.find(
        userCoursePlan => this.$helpers.isFutureTime(userCoursePlan.targetAt),
      );

      return futureUserCoursePlan || {};
    },
    planned() {
      return !this.$helpers.isEmptyObject(this.userCoursePlan);
    },
  },
  async created() {
    await this.getCourse();
    await this.getUserCourses();
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
          userCoursePlan: this.userCoursePlan,
        },
      });
    },
    goToScore() {
      // TODO: スコア状況画面へ遷移する
      console.log('goToScore');
    },
    async getCourse() {
      await this.$store.dispatch('course/getChoosenCourse', this.course.id);
    },
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
