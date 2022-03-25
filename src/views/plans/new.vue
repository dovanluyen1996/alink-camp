<template>
  <v-ons-page @show="show">
    <custom-toolbar title="新規計画" />

    <v-ons-tabbar
      position="top"
      :tabs="tabs"
      :visible="true"
      :index.sync="activeIndex"
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
  data() {
    return {
      tabs: [
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
      ],
      activeIndex: 0,
      action: '',
      isItemRestored: false,
    };
  },
  methods: {
    async show() {
      await this.$store.dispatch('models/item/getItems');

      this.$store.dispatch('plan/clean');
      this.$store.dispatch('plan/setCampsiteId', this.campsite.id);
      // 初期表示のとき、前回保存したアイテムのチェックを復元する
      if (!this.isItemRestored) {
        const items = this.$store.getters['models/item/all'];
        this.$store.dispatch('plan/restoreCheckedItem', items);
        this.isItemRestored = true;
      }
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
