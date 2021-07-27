<template>
  <v-ons-page @show="show">
    <custom-toolbar
      title="風予測"
      :subtitle="courses.length ? '確認をしたいコース選択' : ''"
    />
    <div class="content">
      <no-data v-if="courses.length === 0">
        <p>
          予定日設定、またはお気に入りにしている<br>
          ゴルフコースがありません。<br>
          検索より設定してから、ご利用ください。<br>
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
      const favoritedUserCourses = this.$store.getters['models/userCourse/favorited'];
      const planedUserCourses = this.$store.getters['models/userCourse/hasPlanInFuture'];
      const planedUserCourseIds = new Set(planedUserCourses.map(userCourse => userCourse.id));

      // 予定日がある または お気に入りのuserCourse
      return [...planedUserCourses, ...favoritedUserCourses.filter(
        userCourse => !planedUserCourseIds.has(userCourse.id),
      )];
    },
  },
  methods: {
    async getUserCourses() {
      await this.$store.dispatch('models/userCourse/getUserCourses');
    },
    goToCourseSearch() {
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
