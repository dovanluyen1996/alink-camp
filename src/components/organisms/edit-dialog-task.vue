<template>
  <v-ons-modal
    :visible.sync="isVisible"
    class="edit-dialog-task"
    animation="fade"
  >
    <div class="edit-dialog-task__box">
      <div class="edit-dialog-task__content">
        <textarea
          v-model="task"
          class="edit-dialog-task__textarea"
        />
        <div
          class="close-dialog"
          @click="closeDialog()"
        >
          <img
            src="@/assets/images/form/delete.png"
            class="close-dialog--icon"
          >
        </div>
      </div>
      <v-ons-button
        modifier="yellow"
        class="button--edit-dialog"
        @click="closeTask()"
      >
        保存
      </v-ons-button>
    </div>
  </v-ons-modal>
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
@import '@/assets/scss/_variables.scss';

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  font-size: $font-size-small;
}

.edit-dialog-task {
  &__box {
    position: absolute;
    top: 15%;
    width: 100%;
  }

  &__content {
    position: relative;
    display: inline-block;
    width: 90%;
  }

  &__textarea {
    width: 100%;
    height: 150px;
    padding: 0;
    resize: none;
    border: none;
  }
}

.close-dialog {
  position: absolute;
  top: -9px;
  right: -9px;

  &--icon {
    width: 18px;
  }
}

.button--edit-dialog {
  margin-top: 14px;
}
</style>
