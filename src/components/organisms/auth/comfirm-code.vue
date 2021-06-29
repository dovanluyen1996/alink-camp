<template>
  <text-field
    v-model="inputedValue"
    title="認証コードの入力"
    :errors="errors"
  />
</template>

<script>
import TextField from '@/components/organisms/form/text-field';

export default {
  name: 'AuthComfirmCode',
  components: {
    TextField,
  },
  props: {
    value: {
      type: String,
      default: '',
      requier: true,
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
