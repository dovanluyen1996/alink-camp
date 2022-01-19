<template>
  <v-ons-alert-dialog
    :visible.sync="isVisible"
  >
    <template #title>
      削除確認
    </template>

    <slot />

    <template #footer>
      <v-ons-button
        modifier="quiet quiet-dark"
        @click="cancel()"
      >
        キャンセル
      </v-ons-button>
      <v-ons-button
        @click="clickDelete()"
      >
        削除する
      </v-ons-button>
    </template>
  </v-ons-alert-dialog>
</template>

<script>
export default {
  name: 'DeleteDialog',
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
    clickDelete() {
      this.$emit('clickDelete');
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ {
  .alert-dialog-container {
    box-sizing: border-box;
    height: 237px;
  }

  .alert-dialog-content {
    font-size: 15px;
    font-weight: 300;
  }
}
</style>
