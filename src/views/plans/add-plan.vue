<template>
  <v-ons-page @show="show">
    <custom-toolbar title="新規計画">
      <template #right>
        <delete-dialog-with-icon
          v-show="isShowIconDelete"
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
import DatePlan from '@/components/organisms/plan/add-plan/date-plan';
import ListItemCamp from '@/components/organisms/plan/add-plan/list-item-camp/index';
import DetailScheduleCamp from '@/components/organisms/plan/add-plan/detail-schedule-camp/index';
import CompletedDialog from '@/components/organisms/dialog/completed-dialog';
import DeleteDialogWithIcon from '@/components/organisms/dialog/delete-dialog-with-icon';

export default {
  name: 'AddPlan',
  components: {
    DeleteDialogWithIcon,
    CompletedDialog,
  },
  props: {
    campsite: {
      type: Object,
      required: true,
    },
    isShowIconDelete: {
      type: Boolean,
      default: true,
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
        },
      ],
      activeIndex: 0,
      isShownDeleteDialog: false,
      completedDialogVisible: false,
      action: '',
    };
  },
  methods: {
    async show() {
      await this.setCampsiteId();
      await this.getItems();
    },
    async setCampsiteId() {
      await this.$store.dispatch('plan/setCampsiteId', this.campsite.id);
    },
    async getItems() {
      await this.$store.dispatch('models/item/getItems');
    },
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
