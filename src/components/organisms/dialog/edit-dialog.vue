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
        modifier="quiet dark"
        @click="cancel()"
      >
        キャンセル
      </v-ons-button>
      <v-ons-button
        @click="clickEdit()"
      >
        削除する
      </v-ons-button>
    </template>
  </v-ons-alert-dialog>
</template>

<script>
export default {
  name: 'EditDialog',
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
    clickEdit() {
      this.$emit('clickEdit');
    },
  },
};
</script>
