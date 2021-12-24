<template>
  <v-ons-page>
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
import DayPlan from '@/components/organisms/plan/day-plan';

export default {
  data() {
    return {
      tabs: [
        {
          label: '計画日',
          page: DayPlan,
        },
        {
          label: '持ち物',
          page: DayPlan,
        },
        {
          label: '予定詳細',
          page: DayPlan,
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>

/deep/ {
  .tabbar {
    background-color: #c83200;

    &__content {
      bottom: 0;
    }

    :checked + .tabbar--material__button {
      color: #fff;
    }

    .active {
      .tabbar__label {
        display: inline;
        padding: 5px 18px;
        background-color: #631900;
        border-radius: 15px;
      }
    }
  }

  .content-with-footer {
    &__footer {
      bottom: 15px;
    }
  }
}
</style>
