<template>
  <v-ons-page @show="show">
    <div class="content">
      <loading :visible="isLoading" />
      <div class="text">
        <v-ons-row class="text__desc">
          {{ campsite.name }}
        </v-ons-row>
      </div>

      <div class="title-center">
        <span>天気予報</span>
        <!-- TODO: 持ち物共有は編集時のみ表示する -->
        <v-ons-button
          class="button--share button--yellow"
        >
          持ち物共有
        </v-ons-button>
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
            modifier="large--cta yellow rounded"
            @click="goToRegistration()"
          >
            登録
          </v-ons-button>

          <v-ons-button
            modifier="large--cta rounded"
            class="button--search-day"
            @click="goToDetailPlan()"
          >
            過去の計画一覧
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
    goToRegistration() {
      // TODO: Redirect to Registration
    },
    goToDetailPlan() {
      // TODO: Redirect to Detail Plan
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
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 43px;
    margin: 10px;
    margin-bottom: -10px;
    font-size: 16px;
    font-weight: 600;
    color: #000;
    text-align: center;
    background-color: #eae5e5;
  }

  .content-with-footer {
    height: 0;

    .content-with-footer__content {
      padding-bottom: 0 !important;
    }
  }

  .content-with-footer__footer {
    position: fixed;
    bottom: 0 !important;
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
  right: 7px;
  display: flex;
  align-items: center;
  width: 109px;
  height: 29px;
  font-size: 14px;
  font-weight: 600;
  background-color: $color-yellow;
  border-radius: 15px;

  &::before {
    display: inline-block;
    width: 13px;
    height: 15px;
    margin-right: 6px;
    content: '';
    background-image: url("~@/assets/images/icon-share.png");
    background-position: center;
    background-size: 100%;
  }
}
</style>
