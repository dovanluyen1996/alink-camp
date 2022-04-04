<template>
  <v-ons-page @show="show">
    <custom-toolbar title="新規計画" />

    <v-ons-tabbar
      position="top"
      :tabs="tabs"
      :visible="true"
      :index.sync="activeIndex"
      @prechange="onPreChange"
    />
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
  created() {
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
  },
  computed: {
    tabs() {
      return this.$store.state.components.planTab.tabs;
    },
    activeIndex() {
      return this.$store.state.components.planTab.activeIndex;
    },
    enabled() {
      return this.$store.state.components.planTab.enabled;
    },
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
        font-weight: 600;
        background-color: #631900;
        border-radius: 15px;
      }
    }
  }

  .content-with-footer {
    &__footer {
      bottom: 90px;
    }
  }
}
</style>
