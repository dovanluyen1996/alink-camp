<template>
  <v-ons-page>
    <custom-toolbar title="12/31からの計画" />
    <v-ons-tabbar
      position="top"
      :tabs="tabs"
      :visible="true"
      :index.sync="activeIndex"
    />
  </v-ons-page>
</template>

<script>
import PastPlan from '@/components/organisms/plan/detail-past-plan/past-plan';

export default {
  name: 'AddPlan',
  data() {
    return {
      tabs: [
        {
          label: '計画日',
          page: PastPlan,
        },
        {
          label: '持ち物',
          page: PastPlan,
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
