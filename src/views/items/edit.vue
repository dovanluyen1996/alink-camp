<template>
  <v-ons-page>
    <custom-toolbar title="オリジナルアイテム">
      <template #right>
        <delete-dialog-with-icon
          :is-shown.sync="isShownDeleteDialog"
          @clickDelete="deleteTent"
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
            <tent-name
              v-model="tentName"
              :errors="errors"
              :sticker="sticker"
              :value="tent.name"
            />
            <tent-sticker :sticker="sticker" />
            <template #footer>
              <v-ons-button
                modifier="cta rounded"
                class="add-button"
                @click="showEditDialog"
              >
                登録する
              </v-ons-button>
            </template>
          </content-with-footer>
        </validation-provider>
      </validation-observer>
    </div>

    <edit-dialog
      :is-shown.sync="isShownEditDialog"
      @clickEdit="updateTent"
    >
      アイテム情報を編集します。よろしいですか？
    </edit-dialog>

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
import TentName from '@/components/organisms/tent/name';
import TentSticker from '@/components/organisms/tent/sticker';
import DeleteDialogWithIcon from '@/components/organisms/dialog/delete-dialog-with-icon';
import EditDialog from '@/components/organisms/dialog/edit-dialog';
import CompletedDialog from '@/components/organisms/dialog/completed-dialog';

export default {
  name: 'TentsEdit',
  components: {
    CustomToolbar,
    ContentWithFooter,
    TentName,
    TentSticker,
    DeleteDialogWithIcon,
    CompletedDialog,
    EditDialog,
  },
  props: {
    tent: {
      type: Object,
      default: null,
      required: true,
    },
  },
  data() {
    return {
      tentName: this.tent.name,
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
    updateTent() {
      // TODO: Implement function when update the tent
      this.closeEditDialog();
      this.showCompletedDialog('updateTent');
    },
    deleteTent() {
      // TODO: Implement function when delete the tent
      this.closeDeleteConfirmDialog();
      this.showCompletedDialog('deleteTent');
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
