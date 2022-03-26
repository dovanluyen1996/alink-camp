<template>
  <v-ons-page @show="show">
    <custom-toolbar :title="title" />

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
  name: 'EditPlan',
  props: {
    plan: {
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
          props: { campsite: this.plan.campsite },
        },
        {
          label: '持ち物',
          page: ListItemCamp,
          props: { campsite: this.plan.campsite },
        },
        {
          label: '予定詳細',
          page: DetailScheduleCamp,
          props: { campsite: this.plan.campsite },
        },
      ],
      activeIndex: 0,
      action: '',
    };
  },
  beforeDestroy() {
    this.$store.dispatch('plan/clean');
  },
  computed: {
    detailPlan() {
      return this.$store.getters['models/userCampsitePlan/findById'](this.plan.id);
    },
    title() {
      return `${this.$moment(this.detailPlan.startedDate).format('M/D')}からの計画`;
    },
  },
  methods: {
    async show() {
      await this.getItems();
      await this.getUserCampsitePlan();

      this.setPlanId();
      this.setStartedDate();
      this.setFinishedDate();
      this.setItems();
      this.setTasks();
    },
    async getItems() {
      await this.$store.dispatch('models/item/getItems');
    },
    async getUserCampsitePlan() {
      await this.$store.dispatch('models/userCampsitePlan/getUserCampsitePlan', { userCampsitePlanId: this.plan.id });
    },
    setPlanId() {
      this.$store.dispatch('plan/setPlanId', this.detailPlan.id);
    },
    setStartedDate() {
      this.$store.dispatch('plan/setStartedDate', this.detailPlan.startedDate);
    },
    setFinishedDate() {
      this.$store.dispatch('plan/setFinishedDate', this.detailPlan.finishedDate);
    },
    setItems() {
      this.$store.dispatch('plan/setItems', this.detailPlan.items);
    },
    setTasks() {
      this.$store.dispatch('plan/setTasks', this.detailPlan.tasks);
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
