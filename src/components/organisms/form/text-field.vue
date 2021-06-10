<template>
  <base-field
    :title="title"
    class="text-field"
  >
    <v-ons-input
      v-model="inputedValue"
      type="text"
    />
  </base-field>
</template>

<script>
import BaseField from './base-field';

export default {
  components: {
    BaseField,
  },
  props: {
    value: {
      type: String,
      default: '',
      requier: true,
    },
    title: {
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
