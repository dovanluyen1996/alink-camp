<template>
  <v-ons-page @show="show()">
    <custom-toolbar title="キャンプ場検索" />
    <loading :visible="isLoading" />
    <div class="content">
      <content-with-footer>
        <div class="content-wrap">
          <card-with-tab
            ref="tabContents"
            :tabs="tabs"
            :active-index="activeIndexTab"
            :is-purchased="isPurchased"
            @switchTab="switchTab"
          />
        </div>
        <template #footer>
          <v-ons-button
            modifier="large-search yellow rounded"
            :disabled="searched"
            @click="search()"
          >
            検索
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
import CampsiteSearchLocationTab from '@/components/organisms/campsite-search/location-tab';

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
          component: CampsiteSearchLocationTab,
        },
      ],
    };
  },
  computed: {
    searched() {
      return this.$store.state.campsite.searched;
    },
    activeIndexTab() {
      return this.$store.state.components.cardWithTab.searchCampsiteActiveIndex;
    },
    isPurchased() {
      return this.$store.getters['purchase/isPurchased'];
    },
    isLoading() {
      return this.$store.getters['models/campsite/isLoading'];
    },
  },
  async created() {
    this.resetCardWithTab();
  },
  methods: {
    show() {
      this.$store.commit('campsite/setSearched', false);
      this.moveToTop();
    },
    moveToTop() {
      const scrollContent = this.$el.querySelector('.content-with-footer__content');
      scrollContent.scrollTo(0, 0);
    },
    search() {
      this.$store.commit('campsite/setSearched', true);
    },
    switchTab(index) {
      this.$store.commit('components/cardWithTab/setSearchCampsiteActiveIndex', index);
    },
    resetCardWithTab() {
      this.$store.commit('components/cardWithTab/resetSearchCampsiteActiveIndex');
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

/deep/ .content-wrap {
  .card {
    padding: 0;
  }
}
</style>
