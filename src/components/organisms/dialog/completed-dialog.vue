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
      case 'updateResult':
      case 'updatePlan':
        return '編集完了';
      case 'createResult':
      case 'createPlan':
        return '登録完了';
      case 'deleteResult':
      case 'deletePlan':
        return '削除完了';
      default:
        return null;
      }
    },
    message() {
      switch (this.action) {
      case 'updateResult':
        return 'スコアを編集しました。';
      case 'createResult':
        return 'スコアを登録しました。';
      case 'deleteResult':
        return 'スコアを削除しました。';
      case 'updatePlan':
        return '予定日を編集しました。';
      case 'createPlan':
        return '予定日を登録しました。';
      case 'deletePlan':
        return '予定日を削除しました。';
      default:
        return null;
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
