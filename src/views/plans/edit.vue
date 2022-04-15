<template>
  <v-ons-page @show="show">
    <custom-toolbar :title="title">
      <template #right>
        <delete-dialog-with-icon
          :is-shown.sync="isShownDeleteDialog"
          @clickDelete="deletePlan"
        >
          このキャンプ計画を削除しますか？
        </delete-dialog-with-icon>
      </template>
    </custom-toolbar>
    <loading :visible="isLoading" />
    <div class="content">
      <v-ons-tabbar
        position="top"
        :tabs="tabs"
        :visible="true"
        :index.sync="activeIndex"
        @prechange="onPreChange"
      />

      <completed-dialog
        :action="action"
        :is-visible="completedDialogVisible"
        @close="closeCompletedDialog"
      />
    </div>
  </v-ons-page>
</template>

<script>
import DatePlan from '@/components/organisms/plan/add-plan/date-plan';
import ListItemCamp from '@/components/organisms/plan/add-plan/list-item-camp/index';
import DetailScheduleCamp from '@/components/organisms/plan/add-plan/detail-schedule-camp/index';
import DeleteDialogWithIcon from '@/components/organisms/dialog/delete-dialog-with-icon';
import CompletedDialog from '@/components/organisms/dialog/completed-dialog';

export default {
  name: 'EditPlan',
  components: {
    DeleteDialogWithIcon,
    CompletedDialog,
  },
  props: {
    plan: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isShownDeleteDialog: false,
      completedDialogVisible: false,
      action: '',
    };
  },
  computed: {
    isLoading() {
      let isTabLoading = false;

      if (this.activeTab === '計画日') {
        isTabLoading = this.$store.getters['modules/plan/isLoading'];
      } else if (this.activeTab === '持ち物') {
        isTabLoading = this.$store.getters['models/item/isLoading'] || this.$store.getters['models/weather/isForecast14DaysLoading'];
      } else if (this.activeTab === '予定詳細') {
        isTabLoading = this.$store.getters['models/weather/isForecastHourlyLoading'];
      }

      return this.$store.getters['models/userCampsitePlan/isLoading'] || isTabLoading;
    },
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
    detailPlan() {
      return this.$store.getters['models/userCampsitePlan/findById'](this.plan.id) || {};
    },
    title() {
      return `${this.$moment(this.detailPlan.startedDate).format('M/D')}からの計画` || '';
    },
  },
  created() {
    this.$store.commit('components/planTab/setTabs', [
      {
        label: '計画日',
        page: DatePlan,
        props: {
          campsite: this.plan.campsite,
          isNew: false,
        },
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
    ]);
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
      await this.getUserCampsitePlan();

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
    showCompletedDialog(action) {
      this.action = action;
      this.completedDialogVisible = true;
    },
    closeCompletedDialog() {
      this.completedDialogVisible = false;
      this.goToPlans();
    },
    async deletePlan() {
      this.closeDeleteDialog();
      await this.$store.dispatch('models/userCampsitePlan/deleteUserCampsitePlan', { userCampsitePlanId: this.plan.id });
      this.showCompletedDialog('deletePlan');
    },
    goToPlans() {
      this.$store.dispatch('plansNavigator/pop');
    },
    closeDeleteDialog() {
      this.isShownDeleteDialog = false;
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
