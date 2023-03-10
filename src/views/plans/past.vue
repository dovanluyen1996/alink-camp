<template>
  <v-ons-page @show="show">
    <custom-toolbar :title="title">
      <template #right>
        <delete-dialog-with-icon
          :is-shown.sync="isShownDeleteDialog"
          @clickDelete="deletePlan"
        >
          このキャンプの思い出を削除しますか？
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
// components
import DeleteDialogWithIcon from '@/components/organisms/dialog/delete-dialog-with-icon';
import PastSchedule from '@/components/organisms/plan/past/schedule';
import PastScheduleItem from '@/components/organisms/plan/past/item/index';
import CompletedDialog from '@/components/organisms/dialog/completed-dialog';

export default {
  name: 'PastPlan',
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
      tabs: [
        {
          label: '思い出',
          page: PastSchedule,
          props: { campsite: this.plan.campsite },
        },
        {
          label: '持ち物',
          page: PastScheduleItem,
          props: { campsite: this.plan.campsite },
        },
      ],
      activeIndex: 0,
      isShownDeleteDialog: false,
      completedDialogVisible: false,
      action: '',
    };
  },
  computed: {
    isLoading() {
      // NOTE: 思い出/持ち物タブで天気apiは呼んでいないためタブの判定は不要なのでnew, editと差異がある
      // FIXME: Apiの取得タイミングがずれているため複数回loadingが出るので要検討
      return this.$store.getters['models/userCampsitePlan/isLoading'] || this.$store.getters['models/weather/isPastLoading'];
    },
    detailPlan() {
      return this.$store.getters['models/userCampsitePlan/findById'](this.plan.id) || {};
    },
    title() {
      return `${this.$moment(this.detailPlan.startedDate).format('M/D')}からの計画` || '';
    },
  },
  beforeDestroy() {
    this.$store.dispatch('plan/clean');
  },
  methods: {
    async show() {
      await this.getItems();
      await this.getUserCampsitePlan();

      this.$store.dispatch('plan/clean');
      this.setPlanId();
      this.setStartedDate();
      this.setFinishedDate();
      this.setItems();
      this.setTasks();
      this.setMemories();
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
    setMemories() {
      this.$store.dispatch('plan/setMemories', this.detailPlan.userCampsitePlansMemories);
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
      this.isShownDeleteDialog = false;
      await this.$store.dispatch('models/userCampsitePlan/deleteUserCampsitePlan', { userCampsitePlanId: this.plan.id });
      this.showCompletedDialog('deletePlan');
    },
    goToPlans() {
      this.$store.dispatch('plansNavigator/pop');
    },
  },
};
</script>
<style lang="scss" scoped>

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
