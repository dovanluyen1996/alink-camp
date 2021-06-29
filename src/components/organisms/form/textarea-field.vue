<template>
  <base-field
    :title="title"
    class="text-field"
  >
    <textarea
      v-model="inputedValue"
      class="textarea-input"
      :rows="rows"
      :placeholder="placeholder"
    />
    <div v-if="errors.length">
      {{ errors[0] }}
    </div>
  </base-field>
</template>

<script>
import BaseField from './base-field';

export default {
  name: 'TextAreaField',
  components: {
    BaseField,
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
    rows: {
      type: Number,
      default: 3,
    },
    placeholder: {
      type: String,
      default: '',
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
