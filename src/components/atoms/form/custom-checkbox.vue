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
    &:checked + .custom-input__visual {
      background-image: url('~@/assets/images/form/check-icon.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 23px;
    }
  }
  &__visual {
    display: inline-block;
    width: 24px;
    height: 24px;
    border: 2px solid #d9d9d9;
    box-sizing: border-box;
    background: #fff;
  }
}
</style>
