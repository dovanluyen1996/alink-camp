<template>
  <v-ons-page>
    <custom-toolbar title="オリジナルアイテム">
      <template #right>
        <delete-dialog-with-icon
          :is-shown.sync="isShownDeleteConfirmDialog"
          @clickDelete="deleteItem"
        >
          このアイテムを削除します。<br>
          よろしいですか？ <br>
          ※キャンプ計画に入っている場合も削除されます
        </delete-dialog-with-icon>
      </template>
    </custom-toolbar>

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
              :value="item.name"
            />
            <item-sticker :sticker="sticker" />
            <template #footer>
              <v-ons-button
                modifier="cta rounded"
                class="add-button"
                @click="showEditConfirmDialog"
              >
                保存する
              </v-ons-button>
            </template>
          </content-with-footer>
        </validation-provider>
      </validation-observer>
    </div>

    <confirm-dialog
      :is-shown.sync="isShownEditConfirmDialog"
      @clickConfirm="updateItem"
    >
      <template #title>
        編集確認
      </template>
      <template #message>
        アイテム情報を編集します。よろしいですか？
      </template>
      <template #confirmAction>
        編集する
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
import DeleteDialogWithIcon from '@/components/organisms/dialog/delete-dialog-with-icon';
import ConfirmDialog from '@/components/organisms/dialog/confirm-dialog';
import CompletedDialog from '@/components/organisms/dialog/completed-dialog';

export default {
  name: 'ItemsEdit',
  components: {
    CustomToolbar,
    ContentWithFooter,
    ItemName,
    ItemSticker,
    DeleteDialogWithIcon,
    CompletedDialog,
    ConfirmDialog,
  },
  props: {
    item: {
      type: Object,
      default: null,
      required: true,
    },
  },
  data() {
    return {
      itemName: this.item.name,
      sticker: {
        user_id: 1,
        labels: [
          'ラベルB',
          'ラベルA',
          'ラベルB',
        ],
      },
      isShownEditConfirmDialog: false,
      isShownDeleteConfirmDialog: false,
      isShowCompletedDialogVisible: false,
      action: '',
    };
  },
  methods: {
    updateItem() {
      this.closeEditConfirmDialog();
      // TODO: Implement function below this

      this.showCompletedDialog('updateItem');
    },
    deleteItem() {
      this.closeDeleteConfirmDialog();
      // TODO: Implement function below this

      this.showCompletedDialog('deleteItem');
    },
    closeDeleteConfirmDialog() {
      this.isShownDeleteConfirmDialog = false;
    },
    showCompletedDialog(action) {
      this.action = action;
      this.isShowCompletedDialogVisible = true;
    },
    closeCompletedDialog() {
      this.isShowCompletedDialogVisible = false;
    },
    showEditConfirmDialog() {
      this.isShownEditConfirmDialog = true;
    },
    closeEditConfirmDialog() {
      this.isShownEditConfirmDialog = false;
    },
  },
};

</script>

<style lang="scss" scoped>
/deep/ {
  .page__background {
    background-image: none;
  }

  .tool-bar__right {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.add-button {
  width: 280px;
  background-color: #ff980b;
}
</style>