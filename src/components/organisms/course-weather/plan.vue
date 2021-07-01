<template>
  <div :class="['course-weather-plan', {'is-today' : isToday}]">
    {{ targetAt }}〜
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
    targetAt() {
      const strTargetAt = this.userCoursePlan.targetAt;

      return moment(strTargetAt).format('YYYY/MM/DD HH:mm');
    },
    isToday() {
      const targetDate = moment(this.userCoursePlan.targetAt).format('YYYY/MM/DD');
      const today = moment(new Date()).format('YYYY/MM/DD');

      return targetDate === today;
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
