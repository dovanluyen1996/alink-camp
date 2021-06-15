<template>
  <div :class="['course-weather-plan', {'is-today' : isToday}]">
    {{ user_course_plans.target_at }}〜
    <span class="course-weather-plan__count-down">
      {{ showCountDown }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'CourseWeatherPlan',
  data() {
    return {
      user_course_plans: {
        id: 1,
        user_course_id: 1,
        user_id: 1,
        course_id: 1,
        target_at: '2021/06/14 9:00',
      },
    };
  },
  computed: {
    isToday() {
      return true;
    },
    showCountDown() {
      if (this.isToday) return '予定日当日';

      return '予定日まで6日';
    },
  },
};
</script>

<style scoped lang="scss">
.course-weather-plan {
  padding: 5px 10px;
  margin-bottom: 10px;
  font-size: 12px;
  background: #f2f2f2;

  &__count-down {
    margin-left: 10px;
    font-weight: 600;
  }

  &.is-today {
    background: #fff0f0;

    .course-weather-plan__count-down {
      color: #eb2727;
    }
  }
}
</style>
