<template>
  <label class="check-field">
    <custom-checkbox-group
      :checked-values.sync="Values"
      :checked-value="checkedValue"
      :disable="disable"
    />
    <span
      v-if="label"
      class="check-field__label-text"
      :class="{ disabled: disable }"
    >
      {{ label }}
    </span>
  </label>
</template>

<script>
import CustomCheckboxGroup from '@/components/atoms/form/custom-checkbox-group';

export default {
  name: 'CheckGroupField',
  components: {
    CustomCheckboxGroup,
  },
  props: {
    checkedValues: {
      type: Array,
      default: () => [],
    },
    checkedValue: {
      type: String,
      default: '',
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
    Values: {
      get() {
        return this.checkedValues;
      },
      set(newValue) {
        this.$emit('update:checkedValues', newValue);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.check-field {
  display: inline-flex;
  align-items: center;
  padding: 5px 0;
  font-weight: 600;

  &__label-text {
    margin-left: 8px;
  }
}

.disabled {
  color: #ccc;
}
</style>
