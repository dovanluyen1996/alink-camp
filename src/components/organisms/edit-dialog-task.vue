<template>
  <v-ons-alert-dialog
    :visible.sync="isVisible"
    class="custom-edit-alert-dialog"
  >
    <textarea class="textarea_dialog" />
    <template #footer>
      <v-ons-button
        class="button--edit-dialog"
        @click="closeTask()"
      >
        保存
      </v-ons-button>
    </template>
  </v-ons-alert-dialog>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeTask() {
      // TODO: キャンセル操作
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>

/deep/ {
  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 32px;
    font-size: 12px;
  }
}
</style>
