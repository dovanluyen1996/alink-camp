<template>
  <label class="checkbox-field">
    <input
      v-model="checkedValue"
      type="checkbox"
      :value="label"
      :disabled="disable"
    >
    <span
      v-if="label"
      class="checkbox-field__label-text"
    >
      {{ label }}
    </span>
  </label>
</template>

<script>
export default {
  name: 'CheckboxField',
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: null,
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    checkedValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.checkbox-field {
  display: inline-flex;
  align-items: center;
  padding: 5px 0;
  font-weight: 600;

  &__label-text {
    margin-left: 8px;
  }
}
</style>
