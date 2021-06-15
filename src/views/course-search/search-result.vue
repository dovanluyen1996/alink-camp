<template>
  <v-ons-page>
    <custom-toolbar :title="title" />
    <div class="content">
      <course-list
        fullscreen
        @click="goToCourseShow"
      />
    </div>
  </v-ons-page>
</template>

<script>
// components
import CourseList from '@/components/organisms/course-list.vue';

export default {
  name: 'CourseSearchResult',
  components: {
    CourseList,
  },
  props: {
    title: {
      type: String,
      default: '検索結果',
    },
  },
  methods: {
    goToCourseShow(course) {
      console.log('goToCourseShow', course);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
