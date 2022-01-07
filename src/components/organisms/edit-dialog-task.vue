<template>
  <v-ons-alert-dialog
    :visible.sync="isVisible"
    class="custom-alert-dialog"
  >
    <textarea class="textarea_dialog"/>
    <template #footer>
      <v-ons-button
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
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.custom-alert-dialog {
  background: none;
  border-radius: none;

  .alert-dialog-container {
    padding: 0;
  }

  .textarea_dialog {
    width: 100%;
    height: 150px;
    resize: none;
  }

  .alert-dialog-title {
    display: none !important;
  }
}

</style>
