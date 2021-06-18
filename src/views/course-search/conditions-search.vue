<template>
  <v-ons-page>
    <custom-toolbar title="コース検索" />
    <div class="content">
      <card-with-tab
        :tabs="tabs"
      />
    </div>
  </v-ons-page>
</template>

<script>
// components
import CardWithTab from '@/components/organisms/card-with-tab';

// tab contents
import CourseSearchAreaTab from '@/components/organisms/course-search/area-tab';
import CourseSearchLocationTab from '@/components/organisms/course-search/location-tab';

export default {
  name: 'CourseConditionsSearch',
  components: {
    CardWithTab,
  },
  data() {
    return {
      tabs: [
        {
          label: 'エリアより検索',
          component: CourseSearchAreaTab,
        },
        {
          label: '現在位置より検索',
          component: CourseSearchLocationTab,
        },
      ],
    };
  },
  computed: {
  },
  methods: {
  },
};
</script>

<style scoped lang="scss">
</style>
