<template>
  <date-field
    v-model="inputedValue"
    :title="title"
    placeholder="ラウンド日"
  />
</template>

<script>
// components
import DateField from '@/components/organisms/form/date-field';

export default {
  name: 'UserCourseResultsTargetDateField',
  components: {
    DateField,
  },
  props: {
    value: {
      type: String,
      default: '',
      required: true,
    },
    title: {
      type: String,
      default: null,
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

<style lang="scss" scoped>
/deep/ {
  .card {
    text-align: center;
  }

  .custom-input-date {
    width: 180px;
    margin: 0 auto;
  }
}
</style>
