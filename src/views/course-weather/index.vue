<template>
  <v-ons-page @show="show">
    <custom-toolbar title="コース天気" />
    <div class="content">
      <loading :visible="isLoading" />
      <no-data v-if="userCourses.length === 0 && userCoursePlans.length === 0">
        <p>
          まだお気に入りや予定日設定しているコースがありません。<br>
          コース検索より、設定してください。
        </p>
        <template #actions>
          <v-ons-button
            modifier="cta"
            @click="goToCourseSearch"
          >
            コース検索
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
// pages
import CourseSearchIndex from '@/views/course-search/index';

// components
import NoData from '@/components/organisms/no-data';
import CourseWeatherContent from '@/components/organisms/course-weather/content';

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
      return this.$store.getters['models/userCourse/isLoading'] || this.$store.getters['models/weather/isLoading'];
    },
  },
  methods: {
    async show() {
      this.$store.dispatch('appTabbar/setLastVisitedAt', this.$helpers.localDateWithHyphenFrom(new Date()));
      await this.getUserCourses();
    },
    async getUserCourses() {
      await this.$store.dispatch('models/userCourse/getUserCourses');
    },
    goToCourseSearch() {
      this.$store.commit('courseSearchNavigator/setEnableBusy', false);
      this.$store.dispatch('courseSearchNavigator/reset', {
        extends: CourseSearchIndex,
        onsNavigatorOptions: {
          callback: () => {
            this.$store.commit('courseSearchNavigator/setEnableBusy', true);
          },
        },
      });

      this.$store.commit('appTabbar/setActiveIndexFromTabName', 'courseSearch');
    },
  },
};
</script>
