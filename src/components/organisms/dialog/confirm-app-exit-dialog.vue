<template>
  <v-ons-alert-dialog
    :visible="isVisible"
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
  computed: {
    isVisible() {
      return this.$store.state.components.confirmAppExitDialog.isVisible;
    },
  },
  methods: {
    cancel() {
      this.$store.commit('components/confirmAppExitDialog/setVisible', false);
    },
    appExit() {
      navigator.app.exitApp();
    },
  },
};
</script>
