<template>
  <base-field
    :title="title"
    class="date-field"
  >
    <v-ons-input
      v-model="inputedValue"
      type="date"
    />
  </base-field>
</template>

<script>
import BaseField from './base-field';

export default {
  name: 'DateField',
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

<style lang="scss" scoped>

/deep/ {
  input[type="date"] {
    font-size: 16px;
    font-weight: 600;
    background-image: url('~@/assets/images/form/date.png');
    background-repeat: no-repeat;
    background-position: right center;
    background-size: 34px 30px;
  }

  input[type="date"]::-webkit-calendar-picker-indicator {
    background: none;
  }
}
</style>
