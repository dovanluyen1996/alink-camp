<template>
  <v-ons-page>
    <custom-toolbar title="コース検索" />
    <div class="content">
      <course-list
        :has-chevron="false"
        title="検索履歴"
      />
    </div>
  </v-ons-page>
</template>

<script>
import CourseList from '@/components/organisms/course-list.vue';

export default {
  name: 'RadioField',
  components: {
    CourseList,
  },
};
</script>

<style lang="scss" scoped>
</style>
