<template>
  <v-ons-page @show="show">
    <custom-toolbar title="コースお天気" />
    <div class="content">
      <loading :visible="isLoading" />
      <no-data v-if="userCourses.length === 0 && userCoursePlans.length === 0">
        <p>
          まだお気に入りや予定日設定しているコースがありません。<br>
          コース検索より、設定してください
        </p>
        <template #actions>
          <v-ons-button
            modifier="cta"
            @click="goToCourseSearch"
          >
            早速コース検索
          </v-ons-button>
        </template>
      </no-data>
      <template v-else>
        <course-weather-content
          v-for="userCoursePlan in userCoursePlans"
          :key="userCoursePlan.index"
          :user-course-plan="userCoursePlan"
        />
        <course-weather-content
          v-for="userCourse in userCourses"
          :key="userCourse.index"
          :user-course="userCourse"
        />
      </template>
    </div>
  </v-ons-page>
</template>

<script>
// components
import NoData from '@/components/organisms/no-data';
import CourseWeatherContent from '@/components/organisms/course-weather/content';
import moment from 'moment';

export default {
  name: 'CourseWeather',
  components: {
    NoData,
    CourseWeatherContent,
  },
  computed: {
    userCourses() {
      return this.$store.getters['models/userCourse/onlyFavoritedWithoutPlans'];
    },
    userCoursePlans() {
      return this.$store.getters['models/userCourse/sortedInFuture'];
    },
    isLoading() {
      return this.$store.getters['models/userCourse/isLoading'];
    },
  },
  methods: {
    async show() {
      await this.getUserCourses();
    },
    async getUserCourses() {
      await this.$store.dispatch('models/userCourse/getUserCourses');
    },
    goToCourseSearch() {
      this.$store.commit('appTabbar/setActiveIndexFromTabName', 'courseSearch');
    },
    show() {
      const today = new Date();
      this.$store.dispatch('appTabbar/setLastVisitedAt', moment(today).format('YYYY-MM-DD'));
    },
  },
};
</script>
