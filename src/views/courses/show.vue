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
          :configured="user_course_plans"
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
      user_course_plans: '2021/06/18',
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
      return this.user_course_plans ? `予定日：${this.user_course_plans}` : '予定日設定';
    },
  },
  async created() {
    await this.getCourse();
  },
  methods: {
    toggleFavorite() {
      this.is_favorited = !this.is_favorited;
    },
    goToCoursePlans() {
      this.$store.dispatch('courseSearchNavigator/push', CoursePlans);
    },
    goToScore() {
      console.log('goToScore');
    },
    async getCourse() {
      await this.$store.dispatch('course/getChoosenCourse', this.course.id);
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
