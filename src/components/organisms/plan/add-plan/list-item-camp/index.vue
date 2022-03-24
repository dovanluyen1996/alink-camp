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
        <share-button
          :subject="shareSubject()"
          :message="shareMessage()"
        >
          <template #text>
            持ち物共有
          </template>
        </share-button>
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
            登録
          </v-ons-button>

          <v-ons-button
            modifier="large--cta rounded"
            class="button--search-day"
            @click="goToListPlan"
          >
            過去の計画一覧
          </v-ons-button>
        </template>
      </content-with-footer>
    </div>

    <confirm-dialog
      :is-shown.sync="confirmDialogVisible"
      @clickConfirm="submit"
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
import ShareButton from '@/components/organisms/share-button';

export default {
  components: {
    ForecastTable,
    ItemTable,
    ContentWithFooter,
    ConfirmDialog,
    CompletedDialog,
    ShareButton,
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
    isNew() {
      return this.$store.getters['plan/isNew'];
    },
    params() {
      return this.$store.getters['plan/params'];
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

      if (this.isNew) {
        this.$store.dispatch('plan/createPlan');
      } else {
        this.$store.dispatch('plan/updatePlan');
      }

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
    async getForecast14Days() {
      const params = {
        campsite_id: this.campsite.id,
      };

      const forecast14Days = await this.$store.dispatch('models/weather/getForecast14Days', params);
      return forecast14Days;
    },
    async show() {
      if (this.$helpers.isEmptyObject(this.forecasts)) {
        this.forecasts = await this.getForecast14Days();
      }
    },
    shareSubject() {
      return 'キャンプ情報共有';
    },
    shareMessage() {
      const { sortedItems } = this;
      const { checkedItemIds } = this;
      const checkedItems = sortedItems.filter(item => checkedItemIds.includes(item.id));

      return checkedItems.map(item => item.name).join('\n');
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
  right: 7px;
  width: 109px;
}
</style>
