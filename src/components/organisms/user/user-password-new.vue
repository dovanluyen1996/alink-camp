<template>
  <password-field
    v-model="inputedValue"
    :can-show-password="true"
    help="※6文字以上の半角英数字で登録して下さい"
    title="新しいパスワード"
    class="password-new"
    :errors="errors"
  />
</template>

<script>
import PasswordField from '@/components/organisms/form/password-field';

export default {
  name: 'UserPasswordNew',
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
