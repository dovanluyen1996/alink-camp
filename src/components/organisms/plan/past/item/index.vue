<template>
  <v-ons-page>
    <div class="content">
      <content-with-footer ref="contentWithFooter">
        <campsite-name :campsite-name="campsite.name" />

        <forecast-table
          :campsite="campsite"
          :forecasts="forecasts"
        >
          <template #shareButton>
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
  },
  watch: {
    startedDate() {
      this.getPast();
    },
    finishedDate() {
      this.getPast();
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
      if (!this.startedDate || !this.finishedDate) return;

      const params = {
        campsite_id: this.campsite.id,
        target_date_from: this.startedDate,
        target_date_to: this.finishedDate,
      };

      this.forecasts = await this.$store.dispatch('models/weather/getPast', params);
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
  font-weight: bold;
  color: $color-white;
  text-align: center;
  transform: translate(-50%, -50%);
}
</style>
