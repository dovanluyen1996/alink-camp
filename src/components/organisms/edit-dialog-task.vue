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
  components: {
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      items: [
      ],
    };
  },
  methods: {
    closeTask() {
      // TODO: キャンセル操作
      this.$emit('close');
    },
  },
};
</script>
