<template>
  <password-field
    v-model="inputedValue"
    :can-show-password="true"
    help="※半角英字と数字をどちらも含む6文字以上でパスワード登録して下さい"
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
