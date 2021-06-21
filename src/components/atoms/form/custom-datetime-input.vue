<template>
  <v-ons-input
    v-model="inputedValue"
    :type="type"
    :placeholder="placeholder"
    :class="['custom-input-date', {'is-shown-placeholder' : isShownPlaceholder}]"
  />
</template>

<script>
export default {
  name: 'CustomDatetimeInput',
  props: {
    value: {
      type: String,
      default: '',
      required: true,
    },
    placeholder: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'date',
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
    isShownPlaceholder() {
      const isInvalid = new Date(this.inputedValue).toString() === 'Invalid Date';
      return this.placeholder && isInvalid;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.custom-input-date {
  border: 2px solid #d9d9d9;

  &[type="date"] {
    background-image: url('~@/assets/images/form/date.png');
    background-repeat: no-repeat;
    background-position: right center;
    background-size: 34px 30px;
  }

  /deep/ {
    input {
      border: none;

      &::-webkit-calendar-picker-indicator {
        background: none;
      }
    }
  }

  &.is-shown-placeholder {
    &::before {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: flex;
      align-items: center;
      padding-left: 5px;
      font-size: 16px;
      font-weight: 600;
      pointer-events: none;
      content: attr(placeholder);
    }

    /deep/ {
      input {
        opacity: 0;
      }
    }
  }
}
</style>
