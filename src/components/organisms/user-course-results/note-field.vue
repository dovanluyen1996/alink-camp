<template>
  <validation-provider
    v-slot="{ errors }"
    rules="max:500"
    name="メモ"
  >
    <text-area-field
      v-model="inputedValue"
      title="メモ"
      :errors="errors"
    />
  </validation-provider>
</template>

<script>
// components
import TextAreaField from '@/components/organisms/form/textarea-field';

export default {
  name: 'UserCourseResultsNoteField',
  components: {
    TextAreaField,
  },
  props: {
    value: {
      type: String,
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
