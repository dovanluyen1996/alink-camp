<template>
  <div>
    <text-field
      v-model="inputedValue"
      title="新しいメールアドレス"
      :errors="errors"
    />
  </div>
</template>

<script>
import TextField from '@/components/organisms/form/text-field';

export default {
  name: 'UserEmailNew',
  components: {
    TextField,
  },
  props: {
    value: {
      type: String,
      default: '',
      required: true,
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
