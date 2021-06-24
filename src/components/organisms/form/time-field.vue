<template>
  <base-field
    :title="title"
    class="time-field"
  >
    <custom-datetime-input
      v-model="inputedValue"
      :placeholder="placeholder"
      type="time"
    />
  </base-field>
</template>

<script>
import CustomDatetimeInput from '@/components/atoms/form/custom-datetime-input';
import BaseField from './base-field';

export default {
  name: 'DateField',
  components: {
    BaseField,
    CustomDatetimeInput,
  },
  props: {
    value: {
      type: String,
      default: '',
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
  },
  computed: {
    inputedValue: {
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
