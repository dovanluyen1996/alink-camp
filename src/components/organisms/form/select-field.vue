<template>
  <base-field
    :title="title"
    class="select-field"
  >
    <v-ons-select v-model="selectedValue">
      <option
        value="-1"
        disabled
        selected
        class="placeholder"
      >
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </v-ons-select>
  </base-field>
</template>

<script>
import BaseField from './base-field';

export default {
  name: 'SelectField',
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
    options: {
      type: Array,
      default: () => [],
      requier: true,
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

<style lang="scss" scoped>
.placeholder {
  display: none;
}

/deep/ .select-input {
  background-image: url('~@/assets/images/form/select-arrow.png');
  background-size: 30px;
}
</style>
