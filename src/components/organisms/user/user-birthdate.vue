<template>
  <date-field
    v-model="inputedValue"
    title="生年月日"
  />
</template>

<script>
import DateField from '@/components/organisms/form/date-field';

export default {
  name: 'UserBirthdate',
  components: {
    DateField,
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
