<template>
  <v-ons-page @show="show">
    <custom-toolbar title="コースお天気" />
    <div class="content">
      <no-data v-if="userCourses.length === 0">
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

export default {
  name: 'CourseWeather',
  components: {
    NoData,
    CourseWeatherContent,
  },
  computed: {
    userCourses() {
      const userCourses = this.$store.getters['models/userCourse/validUserCourses'];

      return userCourses;
    },
  },
  methods: {
    async show() {
      // TODO: 予定日天気APIを呼び出す
      await this.getUserCourses();
    },
    async getUserCourses() {
      await this.$store.dispatch('models/userCourse/getUserCourses');
    },
    goToCourseSearch() {
      this.$store.commit('appTabbar/setActiveIndexFromTabName', 'courseSearch');
    },
  },
};
</script>
