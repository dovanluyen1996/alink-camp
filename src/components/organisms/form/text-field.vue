<template>
  <input-base-layout
    :title="title"
    class="text-field"
  >
    <v-ons-input
      v-model="inputedValue"
      type="text"
    />
  </input-base-layout>
</template>

<script>
import InputBaseLayout from './base-layout';

export default {
  components: {
    InputBaseLayout,
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
