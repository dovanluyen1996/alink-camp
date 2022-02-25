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
              :isUserItem="true"
            />
            <item-sticker
              :sticker="sticker"
              @showLabelListDialog="showLabelListDialog"
            />
            <template #footer>
              <v-ons-button
                modifier="cta rounded"
                class="add-button"
                @click="showConfirmCreateItemDialog"
              >
                登録
              </v-ons-button>
            </template>
          </content-with-footer>
        </validation-provider>
      </validation-observer>
    </div>

    <label-list-dialog :is-visible-label-list.sync="isVisibleLabelListDialog" />

    <confirm-dialog
      :is-shown.sync="isShownConfirmCreateItemDialog"
      @clickConfirm="createItem"
    >
      <template #title>
        登録確認
      </template>
      <template #message>
        新たに{{ itemName }}を作成します。<br>
        よろしいですか？
      </template>
      <template #confirmAction>
        登録
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
      isVisibleLabelListDialog: false,
    };
  },
  methods: {
    async createItem() {
      this.closeConfirmCreateItemDialog();

      await this.$store.dispatch('models/item/createItem', { name: this.itemName })
        .then(() => {
          this.showCompletedDialog('createItem');
        })
        .catch((err) => {
          // TODO: 更新失敗のダイアログやトーストなどの表示
          console.log(err);
        });
    },
    showCompletedDialog(action) {
      this.action = action;
      this.isShowCompletedDialogVisible = true;
    },
    closeCompletedDialog() {
      this.isShowCompletedDialogVisible = false;
      this.goToItems();
    },
    showConfirmCreateItemDialog() {
      this.isShownConfirmCreateItemDialog = true;
    },
    closeConfirmCreateItemDialog() {
      this.isShownConfirmCreateItemDialog = false;
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
