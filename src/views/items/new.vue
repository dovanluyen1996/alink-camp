<template>
  <v-ons-page>
    <custom-toolbar title="オリジナルアイテム" />

    <div class="content">
      <validation-observer
        v-slot="{ handleSubmit }"
      >
        <validation-provider
          v-slot="{ errors }"
          rules="required|max:10"
          name="アイテム名"
        >
          <content-with-footer>
            <item-name
              v-model="params.name"
              :errors="errors"
              :is-user-item="true"
            />
            <item-label
              :labels="params.labels"
              @showLabelListDialog="showLabelListDialog"
            />
            <template #footer>
              <v-ons-button
                v-show="isShowCreateItemButton"
                modifier="cta rounded"
                class="add-button"
                @click="handleSubmit(showConfirmCreateItemDialog)"
              >
                登録
              </v-ons-button>
            </template>
          </content-with-footer>
        </validation-provider>
      </validation-observer>
    </div>

    <label-list-dialog
      :checked-labels.sync="params.labels"
      :is-visible-label-list.sync="isVisibleLabelListDialog"
    />

    <confirm-dialog
      :is-shown.sync="isShownConfirmCreateItemDialog"
      @clickConfirm="createItem"
    >
      <template #title>
        登録確認
      </template>
      <template #message>
        新たに{{ params.name }}を作成します。<br>
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
import ItemLabel from '@/components/organisms/item/label';
import ConfirmDialog from '@/components/organisms/dialog/confirm-dialog';
import CompletedDialog from '@/components/organisms/dialog/completed-dialog';
import LabelListDialog from '@/components/organisms/label-list-dialog';

export default {
  name: 'ItemsNew',
  components: {
    CustomToolbar,
    ContentWithFooter,
    ItemName,
    ItemLabel,
    ConfirmDialog,
    CompletedDialog,
    LabelListDialog,
  },
  data() {
    return {
      params: {
        name: '',
        labels: [],
      },
      isShownConfirmCreateItemDialog: false,
      isShowCompletedDialogVisible: false,
      action: '',
      isVisibleLabelListDialog: false,
      isShowCreateItemButton: true,
    };
  },
  mounted() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  beforeDestroy() {
    document.removeEventListener('deviceready', this.onDeviceReady, false);
    window.removeEventListener('native.keyboardshow', this.onKeyBoardShow);
    window.removeEventListener('native.keyboardhide', this.onKeyBoardHide);
  },
  methods: {
    async createItem() {
      this.closeConfirmCreateItemDialog();

      await this.$store.dispatch('models/item/createItem', {
        name: this.params.name,
        label_ids: this.params.labels.map(label => label.id),
      })
        .then(() => {
          this.showCompletedDialog('createItem');
        })
        .catch((err) => {
          console.error(err);
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
    onDeviceReady() {
      window.addEventListener('keyboardWillShow', this.onKeyBoardShow);
      window.addEventListener('keyboardDidHide', this.onKeyBoardHide);
    },
    onKeyBoardShow() {
      this.isShowCreateItemButton = false;
    },
    onKeyBoardHide() {
      this.isShowCreateItemButton = true;
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
