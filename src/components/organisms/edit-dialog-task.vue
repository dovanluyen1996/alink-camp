<template>
  <v-ons-alert-dialog
    :visible.sync="isVisible"
    class="custom-edit-alert-dialog"
  >
    <textarea v-model="task" class="textarea_dialog" />
    <template #footer>
      <v-ons-button
        modifier="yellow"
        class="button--edit-dialog"
        @click="closeTask()"
      >
        保存
      </v-ons-button>
    </template>
    <div
      class="close-dialog"
      @click="closeDialog()"
    >
      <img
        src="@/assets/images/form/delete.png"
        class="close-dialog--icon"
      >
    </div>
  </v-ons-alert-dialog>
</template>

<script>
export default {
  props: {
    tasks: {
      type: Object,
      default: () => {},
    },
    targetAt: {
      type: String,
      default: '',
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      newTask: '',
    };
  },
  computed: {
    task: {
      get() {
        return this.tasks[this.targetAt];
      },
      set(task) {
        this.newTask = task;
      },
    },
  },
  watch: {
    isVisible() {
      if (this.isVisible) this.newTask = this.tasks[this.targetAt];
    },
  },
  methods: {
    closeTask() {
      this.$emit('update:tasks', { ...this.tasks, [this.targetAt]: this.newTask });
      this.$emit('close');
    },
    closeDialog() {
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

.alert-dialog {
  position: relative;
}

.close-dialog {
  position: absolute;
  top: 6px;
  right: -9px;

  &--icon {
    width: 20px;
  }
}
</style>
