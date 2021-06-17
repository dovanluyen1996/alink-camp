<template>
  <text-field
    v-model="inputedValue"
    title="メールアドレス"
  />
</template>

<script>
import TextField from '@/components/organisms/form/text-field';

export default {
  name: 'UserEmail',
  components: {
    TextField,
  },
  props: {
    value: {
      type: String,
      default: '',
      requier: true,
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
