<template>
  <v-ons-alert-dialog
    :visible.sync="isVisible"
  >
    <template #title>
      {{ title }}
    </template>
    {{ message }}
    <template #footer>
      <v-ons-button
        @click="close()"
      >
        OK
      </v-ons-button>
    </template>
  </v-ons-alert-dialog>
</template>

<script>
export default {
  name: 'CompletedDialog',
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
  },
  computed: {
    title() {
      switch (this.action) {
      case 'update':
        return '編集完了';
      case 'create':
        return '登録完了';
      default:
        return '削除完了';
      }
    },
    message() {
      switch (this.action) {
      case 'update':
        return '編集しました。';
      case 'create':
        return '登録しました。';
      default:
        return '削除しました。';
      }
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>
