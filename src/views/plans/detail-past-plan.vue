<template>
  <v-ons-page>
    <custom-toolbar title="12/31からの計画">
      <template #right>
        <delete-dialog-with-icon
          :is-shown.sync="isShownDeleteDialog"
          @clickDelete="deletePlan"
        >
          このキャンプ計画または思い出を削除します。<br>
          よろしいですか？
        </delete-dialog-with-icon>
      </template>
    </custom-toolbar>

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
  </v-ons-page>
</template>

<script>
// components
import DeleteDialogWithIcon from '@/components/organisms/dialog/delete-dialog-with-icon';
import PastPlan from '@/components/organisms/plan/detail-past-plan/past-plan';
import ListItemCamp from '@/components/organisms/plan/add-plan/list-item-camp/index';
import CompletedDialog from '@/components/organisms/dialog/completed-dialog';

export default {
  name: 'DetailPastPlan',
  components: {
    DeleteDialogWithIcon,
    CompletedDialog,
  },
  data() {
    return {
      tabs: [
        {
          label: '思い出',
          page: PastPlan,
        },
        {
          label: '持ち物',
          page: ListItemCamp,
        },
      ],
      activeIndex: 0,
      isShownDeleteDialog: false,
      completedDialogVisible: false,
      action: '',
    };
  },
  methods: {
    showCompletedDialog(action) {
      this.action = action;
      this.completedDialogVisible = true;
    },
    closeCompletedDialog() {
      this.completedDialogVisible = false;
    },
    deletePlan() {
      this.isShownDeleteDialog = false;
      this.showCompletedDialog('deleteItem');
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
