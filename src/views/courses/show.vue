<template>
  <v-ons-page>
    <custom-toolbar title="コースお天気" />
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
          :configured="user_course_plans"
          modifier="large rounded"
          @click="goToSettingsCoursePlans"
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
import CoursesCourseTab from '@/components/organisms/courses/course-tab';

export default {
  name: 'CourseShow',
  components: {
    CardWithTab,
  },
  data() {
    return {
      is_favorited: true,
      user_course_plans: '2021/06/18',
      tabs: [
        {
          label: '天気予報詳細',
          component: CoursesForecastTab,
        },
        {
          label: '詳細情報',
          component: CoursesCourseTab,
        },
      ],
    };
  },
  computed: {
    favoriteButtonText() {
      return this.is_favorited ? 'お気に入り追加済' : 'お気に入り追加';
    },
    plansButtonText() {
      return this.user_course_plans ? `予定日：${this.user_course_plans}` : '予定日設定';
    },
  },
  methods: {
    toggleFavorite() {
      this.is_favorited = !this.is_favorited;
    },
    goToSettingsCoursePlans() {
      console.log('goToSettingsCoursePlans');
    },
    goToScore() {
      console.log('goToScore');
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