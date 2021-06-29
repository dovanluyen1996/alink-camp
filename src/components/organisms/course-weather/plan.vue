<template>
  <div :class="['course-weather-plan', {'is-today' : isToday}]">
    {{ targetAt }}〜
    <span class="course-weather-plan__count-down">
      {{ showCountDown }}
    </span>
  </div>
</template>

<script>
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

      return this.$helpers.toDateTimeString(strTargetAt);
    },
    isToday() {
      const targetDate = this.$helpers.toDate(this.userCoursePlan.targetAt);
      const today = this.$helpers.toDate(new Date());

      return targetDate.getTime() === today.getTime();
    },
    showCountDown() {
      if (this.isToday) return '予定日当日';

      const targetDate = this.$helpers.toDate(this.userCoursePlan.targetAt);
      const today = this.$helpers.toDate(new Date());
      const remainingDays = (targetDate.getTime() - today.getTime()) / 86400000;

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
