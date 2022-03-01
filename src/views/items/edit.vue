<template>
  <v-ons-page>
    <custom-toolbar :title="item.userId === null ? '基本アイテム' : 'オリジナルアイテム'">
      <template #right>
        <delete-dialog-with-icon
          v-if="isUserItem"
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
              :isUserItem="isUserItem"
            />
            <item-label
              :labels="labels"
              @showLabelListDialog="showLabelListDialog"
            />
            <template #footer>
              <v-ons-button
                modifier="cta rounded"
                class="add-button"
                @click="showEditConfirmDialog"
              >
                保存
              </v-ons-button>
            </template>
          </content-with-footer>
        </validation-provider>
      </validation-observer>
    </div>

    <label-list-dialog :is-visible-label-list.sync="isVisibleLabelListDialog" />

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
        編集
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
import ItemLabel from '@/components/organisms/item/label';
import DeleteDialogWithIcon from '@/components/organisms/dialog/delete-dialog-with-icon';
import ConfirmDialog from '@/components/organisms/dialog/confirm-dialog';
import CompletedDialog from '@/components/organisms/dialog/completed-dialog';
import LabelListDialog from '@/components/organisms/label-list-dialog';

export default {
  name: 'ItemsEdit',
  components: {
    CustomToolbar,
    ContentWithFooter,
    ItemName,
    ItemLabel,
    DeleteDialogWithIcon,
    CompletedDialog,
    ConfirmDialog,
    LabelListDialog,
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
      labels: this.item.labels,
      isShownEditConfirmDialog: false,
      isShownDeleteConfirmDialog: false,
      isShowCompletedDialogVisible: false,
      action: '',
      isVisibleLabelListDialog: false,
    };
  },
  computed: {
    isUserItem() {
      return this.item.userId !== null;
    },
  },
  methods: {
    async updateItem() {
      this.closeEditConfirmDialog();

      await this.$store.dispatch('models/item/updateItem', {
        itemId: this.item.id,
        params: { name: this.itemName },
      })
        .then(() => {
          this.showCompletedDialog('updateItem');
        })
        .catch((err) => {
          // TODO: 更新失敗のダイアログやトーストなどの表示
          console.log(err);
        });
    },
    async deleteItem() {
      this.closeDeleteConfirmDialog();

      await this.$store.dispatch('models/item/deleteItem', { itemId: this.item.id })
        .then(() => {
          this.showCompletedDialog('deleteItem');
        })
        .catch((err) => {
          // TODO: 更新失敗のダイアログやトーストなどの表示
          console.log(err);
        });
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
      this.goToItems();
    },
    showEditConfirmDialog() {
      this.isShownEditConfirmDialog = true;
    },
    closeEditConfirmDialog() {
      this.isShownEditConfirmDialog = false;
    },
    showLabelListDialog() {
      this.isVisibleLabelListDialog = true;
    },
    goToItems() {
      this.$store.dispatch('menuNavigator/pop');
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
