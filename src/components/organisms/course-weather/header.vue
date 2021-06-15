<template>
  <div class="course-weather-header">
    <div class="course-name">
      {{ name }}
      <img
        v-if="isFavorited"
        src="@/assets/images/user/user-course/favorite.png"
        width="18px"
      >
    </div>
    <div class="course-address">
      {{ address }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseWeatherHeader',
  props: {
    name: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    isFavorited: {
      type: Boolean,
      default: false,
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
  margin-bottom: 5px;
  color: #888;
}
</style>
