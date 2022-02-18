<template>
  <v-ons-page @show="show">
    <div class="content">
      <loading :visible="isLoading" />
      <div class="text">
        <v-ons-row class="text__desc">
          {{ campsite.name }}
        </v-ons-row>
      </div>

      <!-- TODO: 持ち物共有は編集時のみ表示する -->
      <v-ons-button
        class="button--share button--yellow"
      >
        持ち物共有
      </v-ons-button>

      <div class="title-center">
        天気予報
      </div>

      <forecast-table />
      <item-table
        v-if="items.length > 0"
        :checked-item-ids.sync="checkedItemIds"
        :items="items"
      />

      <div
        v-else
        class="items__note"
      >
        アイテムが登録されていません。<br>
        アイテム追加より登録して下さい。
      </div>

      <content-with-footer>
        <template #footer>
          <v-ons-button
            modifier="large--cta rounded yellow"
            @click="showConfirmDialog"
          >
            編集保存
          </v-ons-button>
        </template>
      </content-with-footer>
    </div>

    <confirm-dialog
      :is-shown.sync="confirmDialogVisible"
      @clickConfirm="createPlan"
    >
      <template #title>
        登録確認
      </template>

      <template #message>
        キャンプ計画を登録します。よろしいですか？
      </template>

      <template #confirmAction>
        登録
      </template>
    </confirm-dialog>

    <completed-dialog
      action="createPlan"
      :is-visible="completedDialogVisible"
      @close="closeCompletedDialog"
    />
  </v-ons-page>
</template>

<script>
// components
import ItemTable from '@/components/organisms/plan/add-plan/list-item-camp/item-table';
import ForecastTable from '@/components/organisms/plan/add-plan/list-item-camp/forecast-table';
import ContentWithFooter from '@/components/organisms/content-with-footer';
import ConfirmDialog from '@/components/organisms/dialog/confirm-dialog';
import CompletedDialog from '@/components/organisms/dialog/completed-dialog';

export default {
  components: {
    ForecastTable,
    ItemTable,
    ContentWithFooter,
    ConfirmDialog,
    CompletedDialog,
  },
  props: {
    campsite: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      checkedItemIds: [],
      confirmDialogVisible: false,
      completedDialogVisible: false,
    };
  },
  computed: {
    items() {
      return this.$store.getters['models/item/all'];
    },
    isLoading() {
      return this.$store.getters['models/item/isLoading'];
    },
  },
  watch: {
    async checkedItemIds() {
      await this.$store.dispatch('plan/setItemIds', this.checkedItemIds);
    },
  },
  methods: {
    async createPlan() {
      this.confirmDialogVisible = false;

      const params = this.$store.getters['plan/params'];

      await this.$store.dispatch('models/userCampsitePlan/createUserCampsitePlan', params);

      this.showCompletedDialog();
    },
    async goToListPlan() {
      await this.$store.dispatch('plansNavigator/pop');
    },
    showConfirmDialog() {
      this.confirmDialogVisible = true;
    },
    showCompletedDialog() {
      this.completedDialogVisible = true;
    },
    async closeCompletedDialog() {
      this.completedDialogVisible = false;
      await this.$store.dispatch('plansNavigator/pop');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

/deep/ {
  .text {
    display: grid;
    justify-content: center;
    background-color: #fff;

    &__desc {
      padding: 15px;
      font-size: 18px;
      font-weight: 300;
    }
  }

  .title-center {
    padding: 32px 0 0;
    font-size: 18px;
    font-weight: 600;
    text-align: center;
  }

  .content-with-footer {
    height: 0;

    .content-with-footer__content {
      padding-bottom: 0 !important;
    }
  }

  .content-with-footer__footer {
    position: fixed;
    bottom: 0;
    left: 100%;

    .button {
      font-size: 14px !important;

      &--search-day {
        margin-top: 20px !important;
      }
    }
  }
}

.items__note {
  position: absolute;
  top: 65%;
  left: 50%;
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  color: $color-white;
  text-align: center;
  transform: translate(-50%, -50%);
}

.button--share {
  position: absolute;
  right: 10px;
  display: flex;
  align-items: center;
  width: 120px;
  height: 34px;
  margin-top: 17px;
  font-weight: 600;
  color: 14px;
  background-color: $color-yellow;
  border-radius: 15px;

  &::before {
    display: inline-block;
    width: 19px;
    height: 22px;
    margin-right: 6px;
    content: '';
    background-image: url("~@/assets/images/icon-share.png");
    background-position: center;
    background-size: 100%;
  }
}
</style>
