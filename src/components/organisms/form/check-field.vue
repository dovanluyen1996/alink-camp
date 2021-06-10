<template>
  <label class="check-field">
    <custom-checkbox v-model="checkedValue" />
    <span class="check-field__label-text">
      <slot />
    </span>
  </label>
</template>

<script>
import CustomCheckbox from '@/components/atoms/form/custom-checkbox';

export default {
  components: {
    CustomCheckbox,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
      requier: true,
    },
    label: {
      type: String,
      default: null,
    },
  },
  computed: {
    checkedValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.check-field {
  display: inline-flex;
  align-items: center;
  font-weight: 600;

  &__label-text {
    margin-left: 8px;
  }
}
</style>
