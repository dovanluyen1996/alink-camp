<template>
  <div>
    検索範囲を指定
    <course-search-conditions-fields />
  </div>
</template>

<script>
// components
import CourseSearchConditionsFields from '@/components/organisms/course-search/conditions-fields.vue';

export default {
  name: 'CourseSearch',
  components: {
    CourseSearchConditionsFields,
  },
};
</script>

<style scoped lang="scss">
</style>
