<template>
  <div class="course-name">
    <span class="course-name__inner">
      {{ courseName }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'CourseName',
  props: {
    courseName: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_mixins.scss';

.course-name {
  @include title-style;

  padding: 7px 30px;
  margin: 30px 0 20px;
  word-break: break-all;
  background: #fff;

  &__inner {
    display: inline-block;
    text-align: left;
  }
}
</style>
