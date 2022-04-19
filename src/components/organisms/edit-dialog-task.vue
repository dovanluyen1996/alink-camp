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
        <div class="edit-dialog-task__close-button">
          <img
            src="@/assets/images/form/delete.png"
            width="18px"
            height="18px"
            @click="closeDialog()"
          >
        </div>
      </div>
      <v-ons-button
        modifier="yellow rounded"
        class="edit-dialog-task__save-button"
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
$edit-area-margin: 5%;

.edit-dialog-task {
  &__box {
    position: absolute;
    top: 15%;
    width: 100%;
  }

  &__content {
    margin: 0 $edit-area-margin 14px;
  }

  &__textarea {
    box-sizing: border-box;
    width: 100%;
    height: 150px;
    resize: none;
    border-radius: 0;
  }

  &__save-button {
    width: 190px;
  }

  &__close-button {
    position: absolute;
    top: -20px;
    right: -20px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-right: $edit-area-margin;
  }
}

</style>
