<template>
  <password-field
    v-model="inputedValue"
    :can-show-password="canShowPassword"
    :help="help"
    :title="title"
    :errors="errors"
  />
</template>

<script>
import PasswordField from '@/components/organisms/form/password-field';

export default {
  name: 'UserPassword',
  components: {
    PasswordField,
  },
  props: {
    value: {
      type: String,
      default: '',
      requier: true,
    },
    canShowPassword: {
      type: Boolean,
      default: false,
    },
    hasHelp: {
      type: Boolean,
      default: true,
    },
    errors: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: 'パスワード',
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
    help() {
      return this.hasHelp ? '※6文字以上の半角英数字で登録して下さい' : null;
    },
  },
};
</script>
