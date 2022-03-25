<template>
  <v-ons-page @show="show">
    <loading :visible="isLoading" />
    <div class="content">
      <div class="text">
        <v-ons-row class="text__desc">
          {{ campsite.name }}
        </v-ons-row>
      </div>

      <div class="title-center">
        <span>天気予報</span>
        <v-ons-button
          class="button--share button--yellow"
        >
          持ち物共有
        </v-ons-button>
      </div>

      <forecast-table
        :campsite="campsite"
        :forecasts="forecasts"
      />
      <item-table
        v-if="sortedItems.length > 0"
        :checked-item-ids.sync="checkedItemIds"
        :items="sortedItems"
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
            @click="showConfirmDialog"
          >
            編集保存
          </v-ons-button>
        </template>
      </content-with-footer>
    </div>

    <confirm-dialog
      :is-shown.sync="confirmDialogVisible"
      @clickConfirm="submit"
    >
      <template #title>
        編集確認
      </template>

      <template #message>
        このキャンプ計画または思い出を編集します。よろしいですか？
      </template>

      <template #confirmAction>
        OK
      </template>
    </confirm-dialog>

    <completed-dialog
      action="updatePlan"
      :is-visible="completedDialogVisible"
      @close="closeCompletedDialog"
    />
  </v-ons-page>
</template>

<script>
// components
import ItemTable from '@/components/organisms/plan/add-plan/list-item-camp/item-table';
import ForecastTable from '@/components/organisms/plan/past/item/forecast-table';
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
      confirmDialogVisible: false,
      completedDialogVisible: false,
      forecasts: {},
    };
  },
  computed: {
    sortedItems() {
      const items = this.$store.getters['models/item/all'];
      const userItems = items.filter(item => item.userId !== null);
      const consoleItems = items.filter(item => item.userId === null);

      userItems.sort((a, b) => b.id - a.id);
      consoleItems.sort((a, b) => a.id - b.id);

      return userItems.concat(consoleItems);
    },
    params() {
      return this.$store.getters['plan/params'];
    },
    startedDate() {
      return this.params.startedDate;
    },
    finishedDate() {
      return this.params.finishedDate;
    },
    checkedItemIds: {
      get() {
        return this.params.itemIds;
      },
      set(newItemIds) {
        this.$store.dispatch('plan/setItemIds', newItemIds);
      },
    },
    isLoading() {
      return this.$store.getters['models/item/isLoading'];
    },
  },
  methods: {
    async submit() {
      this.confirmDialogVisible = false;

      await this.$store.dispatch('plan/updatePlan');

      this.showCompletedDialog();
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
    async getPast() {
      const params = {
        campsite_id: this.campsite.id,
        target_date_from: this.startedDate,
        target_date_to: this.finishedDate,
      };
      const forecast = await this.$store.dispatch('models/weather/getPast', params);
      return forecast;
    },
    async show() {
      if (this.$helpers.isEmptyObject(this.forecasts)) {
        this.forecasts = await this.getPast();
      }
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
