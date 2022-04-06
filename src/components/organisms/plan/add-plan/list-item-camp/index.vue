<template>
  <v-ons-page @show="show">
    <div class="content">
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
        :past-weather="pastWeather"
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
            {{ displayText.saveButton }}
          </v-ons-button>

          <v-ons-button
            v-if="isNew"
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
        {{ displayText.confirmTitle }}
      </template>

      <template #message>
        キャンプ計画を{{ displayText.confirmType }}します。よろしいですか？
      </template>

      <template #confirmAction>
        {{ displayText.confirmSubmit }}
      </template>
    </confirm-dialog>

    <completed-dialog
      :action="completedAction"
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
      pastWeather: {},
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
    displayText() {
      return this.isNew ? {
        saveButton: '登録',
        confirmTitle: '登録確認',
        confirmType: '登録',
        confirmSubmit: '登録',
      } : {
        saveButton: '編集保存',
        confirmTitle: '編集確認',
        confirmType: '編集',
        confirmSubmit: 'OK',
      };
    },
    completedAction() {
      return this.isNew ? 'createPlan' : 'updatePlan';
    },
  },
  methods: {
    async submit() {
      this.confirmDialogVisible = false;

      if (this.isNew) {
        await this.$store.dispatch('plan/createPlan');
      } else {
        await this.$store.dispatch('plan/updatePlan');
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
    async getPast() {
      const pastDates = this.$store.getters['plan/pastDates'];

      if (pastDates.length === 0) return {};

      const params = {
        campsite_id: this.campsite.id,
        target_date_from: pastDates[0],
        target_date_to: pastDates[pastDates.length - 1],
      };

      const past = await this.$store.dispatch('models/weather/getPast', params);
      return past;
    },
    async show() {
      if (this.$helpers.isEmptyObject(this.forecasts)) {
        this.forecasts = await this.getForecast14Days();
      }
      this.pastWeather = await this.getPast();
    },
    shareSubject() {
      return 'キャンプ情報共有';
    },
    shareMessage() {
      const checkedItems = this.sortedItems.filter(item => this.checkedItemIds.includes(item.id));

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
    height: 21%;

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
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 600;
  color: $color-default;
  text-align: center;
}

.button--share {
  right: 7px !important;
  width: 109px !important;
}
</style>
