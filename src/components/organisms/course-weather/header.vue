<template>
  <div class="course-weather-header">
    <div class="course-name">
      {{ course.name }}
      <img
        v-if="userCourse.isFavorited"
        src="@/assets/images/user/favorite.png"
        width="18px"
      >
    </div>
    <div class="course-address">
      {{ course.address }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseWeatherHeader',
  props: {
    userCourse: {
      type: Object,
      required: true,
    },
  },
  computed: {
    course() {
      return this.userCourse.course;
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_mixins.scss';

.course-name {
  @include title-style;

  display: inline-block;
  margin-bottom: 3px;
  text-align: left;
}

.course-address {
  color: #888;
}
</style>
