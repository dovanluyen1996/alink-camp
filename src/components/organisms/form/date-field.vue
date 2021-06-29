<template>
  <base-field
    :title="title"
    class="date-field"
  >
    <custom-datetime-input
      v-model="inputedValue"
      :placeholder="placeholder"
      type="date"
      :errors="errors"
    />
    <div v-if="errors.length">
      {{ errors[0] }}
    </div>
    <annotations-block
      v-if="help"
      class="date-field-help"
    >
      {{ help }}
    </annotations-block>
  </base-field>
</template>

<script>
import CustomDatetimeInput from '@/components/atoms/form/custom-datetime-input';
import AnnotationsBlock from '@/components/atoms/form/annotations-block';
import BaseField from './base-field';

export default {
  name: 'DateField',
  components: {
    BaseField,
    CustomDatetimeInput,
    AnnotationsBlock,
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
    help: {
      type: String,
      default: null,
    },
    errors: {
      type: Array,
      default: () => [],
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

<style lang="scss" scoped>
.date-field-help {
  margin-top: 13px;
}
</style>
