<template>
  <base-field
    :title="title"
    class="radio-field"
  >
    <custom-radio
      v-model="selectedValue"
      :labels="labels"
      :errors="errors"
    />
  </base-field>
</template>

<script>
import CustomRadio from '@/components/atoms/form/custom-radio';
import BaseField from './base-field';

export default {
  name: 'RadioField',
  components: {
    BaseField,
    CustomRadio,
  },
  props: {
    value: {
      // NOTE: htmlのinputはString, サーバーではintで持っているので両方許可する
      type: [Number, String],
      default: -1,
      required: true,
    },
    labels: {
      type: Array,
      default: () => [],
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
    errors: {
      type: Array,
      default: () => [],
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
