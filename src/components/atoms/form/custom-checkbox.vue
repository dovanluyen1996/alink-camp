<template>
  <div class="custom-input">
    <input
      v-model="checkedValue"
      type="checkbox"
      class="custom-input__field"
      :disabled="disable"
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
    disable: {
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
@import '@/assets/scss/_variables.scss';

.custom-input {
  position: relative;
  box-sizing: border-box;
  display: inline-block;
  width: 24px;
  height: 24px;
  border: 2px solid $color-border;

  &__field {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
  }

  &__visual {
    display: inline-block;
    width: 100%;
    height: 100%;
    background: #fff;
    background-image: url('~@/assets/images/form/check-icon.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 23px;
    opacity: 0;

    .custom-input__field:checked + & {
      opacity: 1;
    }
  }
}
</style>
