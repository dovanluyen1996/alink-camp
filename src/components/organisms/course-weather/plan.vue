<template>
  <div :class="['course-weather-plan', {'is-today' : isToday}]">
    {{ userCoursePlan.targetAt | moment('YYYY/MM/DD HH:mm') }}〜
    <span class="course-weather-plan__count-down">
      {{ showCountDown }}
    </span>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'CourseWeatherPlan',
  props: {
    userCoursePlan: {
      type: Object,
      default: null,
      require: true,
    },
  },
  computed: {
    isToday() {
      const targetDate = moment(this.userCoursePlan.targetAt).startOf('days');
      const today = moment().startOf('days');

      return targetDate.isSame(today);
    },
    showCountDown() {
      if (this.isToday) return '予定日当日';

      const targetDate = moment(this.userCoursePlan.targetAt).startOf('days');
      const today = moment().startOf('days');
      const remainingDays = targetDate.diff(today, 'days');

      return `予定日まで${remainingDays}日`;
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.course-weather-plan {
  padding: 5px 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: $font-size-small;
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
