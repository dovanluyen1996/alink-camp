<template>
  <div class="custom-input">
    <input
      v-model="checkedValue"
      type="checkbox"
      class="custom-input__field"
    >
    <span class="custom-input__visual" />
  </div>
</template>

<script>
export default {
  name: 'CustomCheckbox',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    checkedValue: {
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
.custom-input {
  display: inline-block;

  &__field {
    display: none;
  }

  &__visual {
    box-sizing: border-box;
    display: inline-block;
    width: 24px;
    height: 24px;
    background: #fff;
    border: 2px solid #d9d9d9;

    .custom-input__field:checked + & {
      background-image: url('~@/assets/images/form/check-icon.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 23px;
    }
  }
}
</style>
