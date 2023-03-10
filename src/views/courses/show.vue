<template>
  <v-ons-page @show="show">
    <custom-toolbar title="ゴルフ場情報" />
    <div class="content">
      <loading :visible="isLoading" />
      <course-name :course-name="course.name" />
      <div class="course-show-header">
        <v-ons-button
          :configured="favorited"
          modifier="large rounded favorite"
          @click="settingFavorited"
        >
          {{ favoriteButtonText }}
        </v-ons-button>
        <v-ons-button
          :configured="planned"
          modifier="large rounded plan"
          @click="goToCoursePlans"
        >
          {{ plansButtonText }}
        </v-ons-button>
        <v-ons-button
          modifier="large rounded score"
          @click="goToScore"
        >
          スコア状況
        </v-ons-button>
      </div>

      <div class="course-show">
        <card-with-tab
          :tabs="tabs"
          :active-index="activeIndexTab"
          :class="{'custom-card': activeIndexTab === 0}"
          @switchTab="switchTab"
        />
      </div>
    </div>
  </v-ons-page>
</template>

<script>
import settings from '@/config/settings';

// components
import CardWithTab from '@/components/organisms/card-with-tab';
import CourseName from '@/components/organisms/course-name';

// tab contents
import CoursesForecastTab from '@/components/organisms/courses/forecast-tab';
import CoursesInformationTab from '@/components/organisms/courses/information-tab';

// pages
import CoursePlans from '@/views/courses/plans/';
import ScoresIndexPage from '@/views/scores/index';
import UserCourseResultsIndex from '@/views/user-course-results/index';
import UserCourseResultsNew from '@/views/user-course-results/new';

export default {
  name: 'CourseShow',
  components: {
    CardWithTab,
    CourseName,
  },
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tabs: [
        {
          label: '天気予報詳細',
          component: CoursesForecastTab,
        },
        {
          label: '施設詳細',
          component: CoursesInformationTab,
        },
      ],
    };
  },
  computed: {
    favoriteButtonText() {
      return this.favorited ? 'お気に入り追加済' : 'お気に入り追加';
    },
    plansButtonText() {
      return this.planned ? `予定日：${this.$helpers.localDateFrom(this.userCoursePlan.targetAt)}` : '予定日設定';
    },
    userCourse() {
      return this.$store.getters['models/userCourse/findByCourseId'](this.course.id);
    },
    userCoursePlan() {
      return this.$store.getters['models/userCourse/nearestPlan'](this.course.id);
    },
    planned() {
      return this.$helpers.isPresentObject(this.userCoursePlan);
    },
    favorited() {
      return this.userCourse ? this.userCourse.isFavorited : false;
    },
    userCourseResultSize() {
      return this.$store.getters['models/userCourseResult/size'];
    },
    isLoading() {
      return this.$store.getters['models/userCourse/isLoading']
        || this.$store.getters['models/userCourseResult/isLoading']
        || this.$store.getters['models/weather/isLoading'];
    },
    activeIndexTab() {
      return this.$store.state.components.cardWithTab.showCourseActiveIndex;
    },
  },
  created() {
    this.resetCardWithTab();
  },
  methods: {
    goToCoursePlans() {
      this.$store.dispatch('courseSearchNavigator/push', {
        extends: CoursePlans,
        onsNavigatorProps: {
          course: this.course,
          userCoursePlan: this.userCoursePlan,
        },
      });
    },
    async goToScore() {
      await this.getUserCourseResults();

      this.$store.commit('scoresNavigator/setEnableBusy', false);
      this.$store.commit('appTabbar/setActiveIndex', settings.views.appTabbar.tabIndexes.scores);
      this.$store.dispatch('scoresNavigator/reset', ScoresIndexPage);

      if (this.userCourseResultSize) {
        this.goToScoreSummary();
      } else {
        this.goToCreateScore();
      }
    },
    goToCreateScore() {
      this.$store.dispatch('scoresNavigator/push', {
        extends: UserCourseResultsNew,
        onsNavigatorProps: {
          course: this.course,
          userCourse: this.userCourse,
        },
        onsNavigatorOptions: {
          callback: () => {
            this.$store.commit('scoresNavigator/setEnableBusy', true);
          },
        },
      });
    },
    goToScoreSummary() {
      this.$store.dispatch('scoresNavigator/push', {
        extends: UserCourseResultsIndex,
        onsNavigatorProps: {
          userCourse: this.userCourse,
        },
        onsNavigatorOptions: {
          callback: () => {
            this.$store.commit('scoresNavigator/setEnableBusy', true);
          },
        },
      });
    },
    async show() {
      await this.getCourse();
      await this.getUserCourses();
    },
    async getCourse() {
      await this.$store.dispatch('course/getChoosenCourse', this.course.id);
    },
    async getUserCourses() {
      await this.$store.dispatch('models/userCourse/getUserCourses');
    },
    async settingFavorited() {
      if (this.userCourse) {
        await this.updateUserCourseFavorited();
      } else {
        await this.createUserCourseFavorited();
      }
    },
    async createUserCourseFavorited() {
      const params = {
        courseId: this.course.id,
        isFavorited: true,
      };

      await this.$store.dispatch('models/userCourse/createUserCourse', params);
    },
    async updateUserCourseFavorited() {
      const params = {
        isFavorited: !this.favorited,
      };

      await this.$store.dispatch('models/userCourse/updateUserCourse', {
        userCourseId: this.userCourse.id,
        params,
      });
    },
    async getUserCourseResults() {
      await this.getUserCourses();
      if (this.userCourse) await this.$store.dispatch('models/userCourseResult/getUserCourseResults', this.userCourse.id);
    },
    switchTab(index) {
      this.$store.commit('components/cardWithTab/setShowCourseActiveIndex', index);
    },
    resetCardWithTab() {
      this.$store.commit('components/cardWithTab/resetShowCourseActiveIndex');
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

    &--favorite,
    &--plan,
    &--score {
      &::before {
        float: left;
        width: 20px;
        height: 28px;
        margin-left: 5px;
        content: '';
        background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
      }
    }

    &--favorite {
      &::before {
        background-image: url('~@/assets/images/favorite.png');
      }
    }

    &--plan {
      &::before {
        background-image: url('~@/assets/images/calendar.png');
      }
    }

    &--score {
      &::before {
        background-image: url('~@/assets/images/note.png');
      }
    }

    &[configured] {
      color: inherit;
      background: #d9d9d9;

      &::before {
        background-image: url('~@/assets/images/check.png');
      }
    }
  }
}
</style>
