<template>
  <div class="course-weather-the-day-before">
    <div class="course-weather-the-day-before__title">
      予定日前日の<br>お天気
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseWeatherTheDayBefore',
  props: {
    forecast: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped lang="scss">
.course-weather-the-day-before {
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #d9d9d9;
}
</style>
