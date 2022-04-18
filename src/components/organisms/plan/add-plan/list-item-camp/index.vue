<template>
  <v-ons-page @show="show">
    <div class="content">
      <content-with-footer ref="contentWithFooter">
        <campsite-name :campsite-name="campsite.name" />

        <forecast-table
          :campsite="campsite"
          :forecasts="forecasts"
          :past-weather="pastWeather"
        >
          <template #shareButton>
            <!-- TODO: 持ち物共有は編集時のみ表示する -->
            <share-button
              :subject="shareSubject()"
              :message="shareMessage()"
            >
              <template #text>
                持ち物共有
              </template>
            </share-button>
          </template>
        </forecast-table>
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
import CampsiteName from '@/components/organisms/campsite-name';

export default {
  components: {
    ForecastTable,
    ItemTable,
    ContentWithFooter,
    ConfirmDialog,
    CompletedDialog,
    ShareButton,
    CampsiteName,
  },
  props: {
    campsite: {
      type: Object,
      required: true,
    },
    isNew: {
      type: Boolean,
      default: false,
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
    isLoading() {
      return this.$store.getters['models/item/isLoading']
        || this.$store.getters['models/weather/isForecast14DaysLoading'];
    },
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
  watch: {
    isLoading() {
      // NOTE: 新規・編集の判定でフッターの高さが変わるためコンテンツの余白を再計算させる
      this.$refs.contentWithFooter.setContentMargin();
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
  .content-with-footer__footer {
    .button {
      font-size: $font-size-default;

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
</style>
