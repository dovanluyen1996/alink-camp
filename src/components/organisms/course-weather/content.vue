<template>
  <v-ons-card
    class="course-weather-show"
    @click="goToCourseDetail"
  >
    <course-weather-header
      :user-course="useUserCourse"
    />
    <div class="course-weather-detail">
      <course-weather-plan
        v-if="userCoursePlan"
        :user-course-plan="userCoursePlan"
      />

      <template v-if="userCoursePlan && ForecastScheduledDate">
        <course-weather-of-the-day :forecast="ForecastScheduledDate" />
        <course-weather-the-day-before :forecast="ForecastScheduledDate.dayBefore" />
        <course-weather-hourly-weather :forecast="ForecastScheduledDate.targetDate" />
      </template>
      <template v-else-if="Forecast10Days">
        <course-weather-calendar
          :forecasts="Forecast10Days.items"
        />
      </template>
    </div>
  </v-ons-card>
</template>

<script>
import settings from '@/config/settings';

// components
import CourseWeatherHeader from '@/components/organisms/course-weather/header';
import CourseWeatherPlan from '@/components/organisms/course-weather/plan';
import CourseWeatherOfTheDay from '@/components/organisms/course-weather/weather-of-the-day';
import CourseWeatherTheDayBefore from '@/components/organisms/course-weather/weather-the-day-before';
import CourseWeatherHourlyWeather from '@/components/organisms/course-weather/hourly-weather';
import CourseWeatherCalendar from '@/components/organisms/course-weather/calendar';

// pages
import CourseSearchIndexPage from '@/views/course-search/index';
import CourseShowPage from '@/views/courses/show';

export default {
  name: 'CourseWeatherContent',
  components: {
    CourseWeatherHeader,
    CourseWeatherPlan,
    CourseWeatherOfTheDay,
    CourseWeatherTheDayBefore,
    CourseWeatherHourlyWeather,
    CourseWeatherCalendar,
  },
  props: {
    userCourse: {
      type: Object,
      default: () => {},
    },
    userCoursePlan: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      ForecastScheduledDate: null,
      Forecast10Days: null,
    };
  },
  computed: {
    useUserCourse() {
      if (!this.userCoursePlan) return this.userCourse;
      return this.$store.getters['models/userCourse/findByCourseId'](this.userCoursePlan.courseId);
    },
  },
  watch: {
    async useUserCourse() {
      this.ForecastScheduledDate = await this.getForecastScheduledDate();
      this.Forecast10Days = await this.getForecast10Days();
    },
  },
  async created() {
    this.ForecastScheduledDate = await this.getForecastScheduledDate();
    this.Forecast10Days = await this.getForecast10Days();
  },
  methods: {
    async getForecastScheduledDate() {
      if (!this.userCoursePlan) return null;
      const params = {
        course_id: this.useUserCourse.courseId,
        target_date: this.userCoursePlan.targetAt,
      };

      const forecasts = await this.$store.dispatch('models/weather/getForecastScheduledDate', params);
      return forecasts;
    },
    async getForecast10Days() {
      const params = {
        course_id: this.useUserCourse.courseId,
      };

      const forecasts = await this.$store.dispatch('models/weather/getForecast10Days', params);
      return forecasts;
    },
    goToCourseDetail() {
      this.$store.commit('appTabbar/setActiveIndex', settings.views.appTabbar.tabIndexes.courseSearch);
      this.$store.dispatch('courseSearchNavigator/reset', CourseSearchIndexPage);
      this.$store.dispatch('courseSearchNavigator/push', {
        extends: CourseShowPage,
        onsNavigatorProps: {
          course: this.useUserCourse.course,
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.course-weather-detail {
  display: flex;
  flex-wrap: wrap;
}

.course-weather-plan {
  width: 100%;
}

.course-weather-of-the-day {
  width: 100%;
  margin-bottom: 10px;
}

.course-weather-the-day-before {
  width: 100%;
  margin-bottom: 10px;
}

.course-weather-time-table {
  width: 100%;
}

@media screen and (min-width: 320px) {
  .course-weather-of-the-day {
    width: 61%;
  }

  .course-weather-the-day-before {
    width: 36%;
    margin-left: 3%;
  }
}

@media screen and (min-width: 375px) {
  .course-weather-the-day-before {
    width: 32%;
    margin-left: 7%;
  }
}

@media screen and (min-width: 590px) {
  .course-weather-of-the-day {
    width: 180px;
    margin-bottom: 0;
  }

  .course-weather-the-day-before {
    width: 95px;
    margin-bottom: 0;
    margin-left: 20px;
  }

  .course-weather-time-table {
    flex: 1;
    width: auto;
    margin-left: 20px;
  }
}
</style>
