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
import DatePlan from '@/components/organisms/plan/add-plan/date-plan';

export default {
  name: 'AddPlan',
  data() {
    return {
      tabs: [
        {
          label: '計画日',
          page: DatePlan,
        },
        {
          label: '持ち物',
          page: DatePlan,
        },
        {
          label: '予定詳細',
          page: DatePlan,
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

/deep/ {
  .tabbar {
    background-color: #c83200;

    &__content {
      bottom: 0;
    }

    :checked + .tabbar--material__button {
      color: $color-white;
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
      bottom: 90px;
    }
  }
}
</style>
