<template>
  <base-field
    :title="title"
    class="text-field"
  >
    <v-ons-input
      v-model="inputedValue"
      type="text"
    />
    <div
      v-if="errors.length"
      class="input-error-msg"
    >
      {{ errors[0] }}
    </div>
  </base-field>
</template>

<script>
import BaseField from './base-field';

export default {
  name: 'TextField',
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
