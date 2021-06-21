<template>
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
</template>

<script>
export default {
  name: 'CustomSelect',
  props: {
    value: {
      type: [Number, String],
      default: -1,
      required: true,
    },
    options: {
      type: Array,
      default: () => [],
      required: true,
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
  padding-right: 30px;
  font-size: 16px;
  font-weight: 600;
  background-image: url('~@/assets/images/form/select-arrow.png');
  background-size: 30px;
}
</style>
