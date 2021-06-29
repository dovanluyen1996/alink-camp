<template>
  <v-ons-page>
    <custom-toolbar title="コースお天気" />
    <div class="content">
      <no-data v-if="user.user_courses.length === 0">
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
          v-for="courses in user.user_courses"
          :key="courses.index"
          :user-courses="courses"
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
  data() {
    return {
      user: {
        user_courses: [
          {
            id: 1,
            user_id: 1,
            course_id: 1,
            is_favorited: true,
          },
          {
            id: 2,
            user_id: 2,
            course_id: 2,
            is_favorited: false,
          },
        ],
      },
    };
  },
  methods: {
    goToCourseSearch() {
      this.$store.commit('appTabbar/setActiveIndexFromTabName', 'courseSearch');
    },
  },
};
</script>
