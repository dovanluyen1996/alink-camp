<template>
  <v-ons-page @show="show">
    <custom-toolbar
      title="風予報"
      :subtitle="courses.length ? '確認をしたいコース選択' : ''"
    />
    <div class="content">
      <no-data v-if="courses.length === 0">
        <p>
          本日、予定されているまたはお気に入りにしているコースがありません。<br>
          コース検索より登録して下さい。<br>
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

      <div v-else>
        <course-list
          :courses="courses"
          :user-courses="userCourses"
          :is-show-favorite-mark="true"
          @click="goToShowWindForecast"
        >
          <template #right>
            <img
              src="@/assets/images/weathers/wind.png"
              width="43px"
            >
          </template>
        </course-list>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
// components
import NoData from '@/components/organisms/no-data';
import CourseList from '@/components/organisms/course-list.vue';

// views
import ShowWindForecastView from '@/views/wind-forecast/show';

// pages
import CourseSearchIndex from '@/views/course-search/index';

export default {
  name: 'WindForecastIndex',
  components: {
    NoData,
    CourseList,
  },
  computed: {
    courses() {
      return this.userCourses.map(userCourse => userCourse.course);
    },
    userCourses() {
      return this.$store.getters['models/userCourse/favoritedOrTodayPlan'];
    },
  },
  methods: {
    async getUserCourses() {
      await this.$store.dispatch('models/userCourse/getUserCourses');
    },
    goToCourseSearch() {
      this.$store.dispatch('courseSearchNavigator/reset', CourseSearchIndex);
      this.$store.commit('appTabbar/setActiveIndexFromTabName', 'courseSearch');
    },
    goToShowWindForecast(course) {
      this.$store.dispatch('windForecastNavigator/push', {
        extends: ShowWindForecastView,
        onsNavigatorProps: {
          course,
        },
      });
    },
    async show() {
      this.$store.dispatch('appTabbar/setLastVisitedAt', this.$helpers.localDateWithHyphenFrom(new Date()));
      await this.getUserCourses();
    },
  },
};
</script>
