<template>
  <v-ons-page @show="show()">
    <custom-toolbar title="キャンプ場検索" />

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
            class="button--orange"
            modifier="large--cta rounded"
            :disabled="searched"
            @click="search()"
          >
            検索する
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
import CampsiteSearchAreaTab from '@/components/organisms/campsite-search/area-tab';

export default {
  name: 'CampsiteConditionsSearch',
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
          component: CampsiteSearchAreaTab,
        },
        {
          name: 'location',
          label: '現在位置より検索',
          component: CampsiteSearchAreaTab,
        },
      ],
    };
  },
  computed: {
    searched() {
      // TODO: This method is copied from `courses/area-tab.vue`.
      // Please rewrite when implement Logic
      return this.$store.state.course.searched;
    },
    activeIndexTab() {
      // TODO: This method is copied from `courses/area-tab.vue`.
      // Please rewrite when implement Logic
      return this.$store.state.components.cardWithTab.searchCourseActiveIndex;
    },
  },
  created() {
    this.resetCardWithTab();
  },
  methods: {
    show() {
      // TODO: This method is copied from `courses/area-tab.vue`.
      // Please rewrite when implement Logic
      this.$store.commit('course/setSearched', false);
    },
    search() {
      // TODO: This method is copied from `courses/area-tab.vue`.
      // Please rewrite when implement Logic
      this.$store.commit('course/setSearched', true);
    },
    switchTab(index) {
      // TODO: This method is copied from `courses/area-tab.vue`.
      // Please rewrite when implement Logic
      this.$store.commit('components/cardWithTab/setSearchCourseActiveIndex', index);
    },
    resetCardWithTab() {
      // TODO: This method is copied from `courses/area-tab.vue`.
      // Please rewrite when implement Logic
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

  .content-with-footer__footer {
    .button {
      background-color: #ff980b !important;
    }
  }
}
</style>
