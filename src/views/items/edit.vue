<template>
  <v-ons-page>
    <custom-toolbar title="オリジナルアイテム">
      <template #right>
        <delete-dialog-with-icon
          :is-shown.sync="isShownDeleteDialog"
          @clickDelete="deleteItem"
        >
          このアイテムを削除します。<br>
          よろしいですか？ <br>
          ※キャンプ計画に入っている場合も削除さ <br>
          れます
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
                @click="showEditDialog"
              >
                保存する
              </v-ons-button>
            </template>
          </content-with-footer>
        </validation-provider>
      </validation-observer>
    </div>

    <confirm-dialog
      :is-shown.sync="isShownEditDialog"
      @clickConfirm="updateItem"
    >
      アイテム情報を編集します。よろしいですか？
    </confirm-dialog>

    <completed-dialog
      :action="action"
      :is-visible="completedDialogVisible"
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
      isShownEditDialog: false,
      isShownDeleteDialog: false,
      completedDialogVisible: false,
      action: '',
    };
  },
  methods: {
    updateItem() {
      this.closeEditDialog();
      // TODO: Implement function below this

      this.showCompletedDialog('updateItem');
    },
    deleteItem() {
      this.closeDeleteConfirmDialog();
      // TODO: Implement function below this

      this.showCompletedDialog('deleteItem');
    },
    closeDeleteConfirmDialog() {
      this.isShownDeleteDialog = false;
    },
    showCompletedDialog(action) {
      this.action = action;
      this.completedDialogVisible = true;
    },
    closeCompletedDialog() {
      this.completedDialogVisible = false;
    },
    showEditDialog() {
      this.isShownEditDialog = true;
    },
    closeEditDialog() {
      this.isShownEditDialog = false;
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

  .alert-dialog-content {
    font-size: 15px;
    font-weight: 300;
  }
}

.add-button {
  width: 280px;
  background-color: #ff980b;
}
</style>
