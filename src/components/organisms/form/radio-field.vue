<template>
  <base-field
    :title="title"
    class="radio-field"
  >
    <label
      v-for="label in labels"
      :key="label.value"
      class="radio-field-label"
    >
      <v-ons-radio
        v-model="selectedValue"
        :value="label.value"
        modifier="material"
      />
      {{ label.text }}
    </label>
  </base-field>
</template>

<script>
import BaseField from './base-field';

export default {
  name: 'RadioField',
  components: {
    BaseField,
  },
  props: {
    value: {
      // NOTE: htmlのinputはString, サーバーではintで持っているので両方許可する
      type: [Number, String],
      default: -1,
      requier: true,
    },
    labels: {
      type: Array,
      default: () => [],
      requier: true,
    },
    title: {
      type: String,
      default: null,
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

<style lang="scss" scoped>
/deep/ {
  .card {
    padding: 10px 0;
    text-align: center;
  }
}

.radio-field-label {
  display: inline-block;
  padding: 10px 0;
  margin: 0 20px;
}

.radio-button {
  margin-right: 5px;
}
</style>
