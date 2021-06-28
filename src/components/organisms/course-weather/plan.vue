<template>
  <div :class="['course-weather-plan', {'is-today' : isToday}]">
    {{ target_at }}〜
    <span class="course-weather-plan__count-down">
      {{ showCountDown }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'CourseWeatherPlan',
  props: {
    target_at: {
      type: String,
      default: null,
      require: true,
    },
  },
  computed: {
    isToday() {
      // TODO: 当日判定を入れてください
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
@import '@/assets/scss/_variables.scss';

.course-weather-plan {
  padding: 5px 10px;
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
