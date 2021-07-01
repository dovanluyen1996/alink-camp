<template>
  <div
    class="delete-icon"
    @click="showDeleteDialog"
  >
    <img
      src="@/assets/images/trash.png"
      width="24px"
      alt="削除する"
    >
    <delete-dialog
      :is-shown.sync="isShownDeleteDialog"
      @clickDelete="clickDelete"
    >
      <slot />
    </delete-dialog>
  </div>
</template>

<script>
import DeleteDialog from '@/components/organisms/dialog/delete-dialog';

export default {
  name: 'DeleteDialogWithIcon',
  props: {
    isShown: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    DeleteDialog,
  },
  computed: {
    isShownDeleteDialog: {
      get() {
        return this.isShown;
      },
      set(newValue) {
        this.$emit('update:isShown', newValue);
      },
    },
  },
  methods: {
    showDeleteDialog() {
      this.isShownDeleteDialog = true;
    },
    clickDelete() {
      this.$emit('clickDelete');
    },
  },
};
</script>

<style scoped lang="scss">
.delete-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin: 8px 6px;
}
</style>
