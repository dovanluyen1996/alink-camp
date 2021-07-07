<template>
  <v-ons-page>
    <custom-toolbar title="コース検索" />

    <div class="content">
      <content-with-footer>
        <card-with-tab
          ref="tabContents"
          :tabs="tabs"
        />
        <template #footer>
          <v-ons-button
            modifier="large--cta rounded"
            @click="searched()"
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
  created() {
    this.$store.commit('courseSearchNavigator/resetSearchConditions');
    this.$store.commit('courseSearchNavigator/resetSearchFlag');
  },
  methods: {
    searched() {
      const activeTabIndex = this.$refs.tabContents.activeIndex;
      const activeTab = this.tabs.find((_tab, index) => index === activeTabIndex).name;

      // activeTab: location/area
      this.$store.commit('courseSearchNavigator/setSearched', activeTab);
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
