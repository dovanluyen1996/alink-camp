<template>
  <base-field
    :title="title"
    class="confirm-field"
  >
    {{ value }}
  </base-field>
</template>

<script>
import BaseField from './base-field';

export default {
  name: 'ConfirmField',
  components: {
    BaseField,
  },
  props: {
    value: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .card {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
}
</style>
