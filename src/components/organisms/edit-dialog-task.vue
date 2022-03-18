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
  methods: {
    closeTask() {
      this.$emit('update-tasks', { ...this.tasks, [this.targetAt]: this.newTask });
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
</style>
