<template>
  <v-ons-page>
    <custom-toolbar title="オリジナルアイテム" />

    <div class="content">
      <validation-observer>
        <validation-provider
          v-slot="{ errors }"
          rules="required|max:10"
          name="アイテム名"
        >
          <content-with-footer>
            <item-name
              v-model="itemName"
              :errors="errors"
              :sticker="sticker"
            />
            <item-sticker
              :sticker="sticker"
              @showLabelDialog="showLabelDialog"
            />
            <template #footer>
              <v-ons-button
                modifier="cta rounded"
                class="add-button"
                @click="showConfirmCreateItemDialog"
              >
                登録する
              </v-ons-button>
            </template>
          </content-with-footer>
        </validation-provider>
      </validation-observer>
    </div>

    <label-list-dialog :is-visible-label-list.sync="isVisibleLabelList" />

    <confirm-dialog
      :is-shown.sync="isShownConfirmCreateItemDialog"
      @clickConfirm="createItem"
    >
      <template #title>
        登録確認
      </template>
      <template #message>
        新たに〇〇〇〇〇〇を作成します。<br>
        よろしいですか？
      </template>
      <template #confirmAction>
        登録する
      </template>
    </confirm-dialog>

    <completed-dialog
      :action="action"
      :is-visible="isShowCompletedDialogVisible"
      @close="closeCompletedDialog"
    />
  </v-ons-page>
</template>

<script>
// components
import CustomToolbar from '@/components/organisms/custom-toolbar.vue';
import ContentWithFooter from '@/components/organisms/content-with-footer';
import ItemName from '@/components/organisms/item/name';
import ItemSticker from '@/components/organisms/item/sticker';
import ConfirmDialog from '@/components/organisms/dialog/confirm-dialog';
import CompletedDialog from '@/components/organisms/dialog/completed-dialog';
import LabelListDialog from '@/components/organisms/label-list-dialog';

export default {
  name: 'ItemsNew',
  components: {
    CustomToolbar,
    ContentWithFooter,
    ItemName,
    ItemSticker,
    ConfirmDialog,
    CompletedDialog,
    LabelListDialog,
  },
  data() {
    return {
      itemName: '',
      sticker: {
        user_id: 1,
        labels: [
          'ラベルB',
          'ラベルA',
          'ラベルB',
        ],
      },
      isShownConfirmCreateItemDialog: false,
      isShowCompletedDialogVisible: false,
      action: '',
    };
  },
  methods: {
    createItem() {
      this.closeConfirmCreateItemDialog();
      // TODO: Implement function below this

      this.showCompletedDialog('createItem');
    },
    showCompletedDialog(action) {
      this.action = action;
      this.isShowCompletedDialogVisible = true;
    },
    closeCompletedDialog() {
      this.isShowCompletedDialogVisible = false;
    },
    showConfirmCreateItemDialog() {
      this.isShownConfirmCreateItemDialog = true;
    },
    closeConfirmCreateItemDialog() {
      this.isShownConfirmCreateItemDialog = false;
    },
    showLabelList() {
      this.isVisibleLabelList = true;
    },
  },
};

</script>

<style lang="scss" scoped>
/deep/ {
  .page__background {
    background-image: none;
  }
}

.add-button {
  width: 280px;
  background-color: #ff980b;
}
</style>
