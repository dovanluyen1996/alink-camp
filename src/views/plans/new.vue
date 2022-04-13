<template>
  <v-ons-page>
    <custom-toolbar title="新規計画" />
    <loading :visible="isLoading" />
    <div class="content">
      <v-ons-tabbar
        position="top"
        :tabs="tabs"
        :visible="true"
        :index.sync="activeIndex"
        @prechange="onPreChange"
      />
    </div>
  </v-ons-page>
</template>

<script>
import DatePlan from '@/components/organisms/plan/add-plan/date-plan';
import ListItemCamp from '@/components/organisms/plan/add-plan/list-item-camp/index';
import DetailScheduleCamp from '@/components/organisms/plan/add-plan/detail-schedule-camp/index';

export default {
  name: 'NewPlan',
  props: {
    campsite: {
      type: Object,
      required: true,
    },
  },
  computed: {
    tabs() {
      return this.$store.state.components.planTab.tabs;
    },
    activeIndex: {
      get() {
        return this.$store.state.components.planTab.activeIndex;
      },
      set(value) {
        this.$store.commit('components/planTab/setActiveIndex', value);
      },
    },
    activeTab() {
      return this.tabs[this.activeIndex].label;
    },
    enabled() {
      return this.$store.state.components.planTab.enabled;
    },
    isLoading() {
      let isTabLoading = false;

      if (this.activeTab === '計画日') {
        isTabLoading = this.$store.getters['models/userCampsitePlan/isLoading'];
      } else if (this.activeTab === '持ち物') {
        isTabLoading = this.$store.getters['models/item/isLoading'] || this.$store.getters['models/weather/isForecast14DaysLoading'];
      } else if (this.activeTab === '予定詳細') {
        isTabLoading = this.$store.getters['models/weather/isForecastHourlyLoading'];
      }

      return isTabLoading;
    },
  },
  async created() {
    this.$store.commit('components/planTab/setTabs', [
      {
        label: '計画日',
        page: DatePlan,
        props: { campsite: this.campsite },
      },
      {
        label: '持ち物',
        page: ListItemCamp,
        props: { campsite: this.campsite },
      },
      {
        label: '予定詳細',
        page: DetailScheduleCamp,
        props: { campsite: this.campsite },
      },
    ]);
    this.$store.commit('components/planTab/setActiveIndex', 0);

    // fetch
    await this.getItems();

    // set store
    this.setCampsiteId();
  },
  beforeDestroy() {
    this.$store.dispatch('plan/clean');
  },
  methods: {
    onPreChange(event) {
      if (!this.enabled) event.cancel();
    },
    async show() {
      await this.getItems();

      this.setCampsiteId();
    },
    async getItems() {
      await this.$store.dispatch('models/item/getItems');
    },
    setCampsiteId() {
      this.$store.dispatch('plan/setCampsiteId', this.campsite.id);
      // 前回保存したアイテムのチェックを復元する
      const items = this.$store.getters['models/item/all'];
      this.$store.dispatch('plan/restoreCheckedItem', items);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

/deep/ {
  .tabbar {
    display: flex;
    align-items: center;
    height: 36px;
    background-color: #ef6539;

    &__button {
      height: auto;
      line-height: 36px;
    }

    &__content {
      top: 36px !important;
      bottom: 0;
    }

    :checked + .tabbar--material__button {
      color: $color-white;
    }

    .active {
      .tabbar__label {
        display: inline;
        padding: 2px 15px;
        font-size: 16px;
        font-weight: bold;
        background-color: #631900;
        border-radius: 15px;
      }
    }
  }
}
</style>
