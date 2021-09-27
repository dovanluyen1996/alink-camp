<template>
  <v-ons-page @show="show()">
    <custom-toolbar title="コース検索" />

    <div class="content">
      <content-with-footer>
        <card-with-tab
          ref="tabContents"
          :tabs="tabs"
          :active-index="activeIndexTab"
          @switchTab="switchTab"
        />
        <template #footer>
          <v-ons-button
            modifier="large--cta rounded"
            :disabled="searched"
            @click="search()"
          >
            絞り込み選択
          </v-ons-button>
        </template>
      </content-with-footer>
    </div>
  </v-ons-page>
</template>

<script>
// components
import CardWithTab from '@/components/organisms/card-with-tab';
import ContentWithFooter from '@/components/organisms/content-with-footer';

// tab contents
import CourseSearchAreaTab from '@/components/organisms/course-search/area-tab';
import CourseSearchLocationTab from '@/components/organisms/course-search/location-tab';

export default {
  name: 'CourseConditionsSearch',
  components: {
    CardWithTab,
    ContentWithFooter,
  },
  data() {
    return {
      tabs: [
        {
          name: 'area',
          label: 'エリアより検索',
          component: CourseSearchAreaTab,
        },
        {
          name: 'location',
          label: '現在位置より検索',
          component: CourseSearchLocationTab,
        },
      ],
    };
  },
  computed: {
    searched() {
      return this.$store.state.course.searched;
    },
    activeIndexTab() {
      return this.$store.state.components.cardWithTab.searchCourseActiveIndex;
    },
  },
  created() {
    this.resetCardWithTab();
  },
  methods: {
    show() {
      this.$store.commit('course/setSearched', false);
    },
    search() {
      this.$store.commit('course/setSearched', true);
    },
    switchTab(index) {
      this.$store.commit('components/cardWithTab/setSearchCourseActiveIndex', index);
    },
    resetCardWithTab() {
      this.$store.commit('components/cardWithTab/resetSearchCourseActiveIndex');
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ {
  ons-select {
    width: 100%;
  }
}
</style>
