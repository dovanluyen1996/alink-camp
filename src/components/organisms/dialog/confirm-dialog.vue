<template>
  <v-ons-alert-dialog
    :visible.sync="isVisible"
  >
    <template #title>
      <slot name="title"></slot>
    </template>

    <slot name="message"></slot>

    <template #footer>
      <v-ons-button
        modifier="quiet quiet-dark"
        @click="cancel()"
      >
        キャンセル
      </v-ons-button>
      <v-ons-button
        @click="confirm()"
      >
        <slot name="confirmAction"></slot>
      </v-ons-button>
    </template>
  </v-ons-alert-dialog>
</template>

<script>
export default {
  name: 'ConfirmDialog',
  props: {
    isShown: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isVisible: {
      get() {
        return this.isShown;
      },
      set(newValue) {
        this.$emit('update:isShown', newValue);
      },
    },
  },
  methods: {
    cancel() {
      this.isVisible = false;
    },
    confirm() {
      this.$emit('clickConfirm');
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ {
  .alert-dialog-container {
    position: relative;
    box-sizing: border-box;
    height: 237px;
  }

  .alert-dialog-content {
    font-size: 15px;
  }

  .alert-dialog-footer {
    position: absolute;
    bottom: 0;
  }
}
</style>
