<template>
  <v-ons-alert-dialog
    :visible.sync="isVisible"
  >
    <template #title>
      アプリ終了の確認
    </template>

    アプリを終了します。よろしいですか？

    <template #footer>
      <v-ons-button
        modifier="quiet quiet--dark"
        @click="cancel()"
      >
        キャンセル
      </v-ons-button>
      <v-ons-button
        @click="appExit()"
      >
        終了する
      </v-ons-button>
    </template>
  </v-ons-alert-dialog>
</template>

<script>
export default {
  name: 'ConfirmAppExitDialog',
  props: {
    isShown: {
      type: Boolean,
      required: true,
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
    appExit() {
      navigator.app.exitApp();
    },
  },
};
</script>
