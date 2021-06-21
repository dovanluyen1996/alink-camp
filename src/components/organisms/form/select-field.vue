<template>
  <base-field
    :title="title"
    class="select-field"
  >
    <custom-select
      v-model="selectedValue"
      :options="options"
      :placeholder="placeholder"
    />
  </base-field>
</template>

<script>
import CustomSelect from '@/components/atoms/form/custom-select';
import BaseField from './base-field';

export default {
  name: 'SelectField',
  components: {
    BaseField,
    CustomSelect,
  },
  props: {
    value: {
      // NOTE: htmlのinputはString, サーバーではintで持っているので両方許可する
      type: [Number, String],
      default: -1,
      required: true,
    },
    options: {
      type: Array,
      default: () => [],
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: '',
    },
  },
  computed: {
    selectedValue: {
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
