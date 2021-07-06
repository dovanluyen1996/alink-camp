<template>
  <!-- TODO: #344がマージされたらtextareaにする -->
  <validation-provider
    v-slot="{ errors }"
    rules="max:500"
    name="メモ"
  >
    <text-field
      v-model="inputedValue"
      title="メモ"
    />
    <span>{{ errors[0] }}</span>
  </validation-provider>
</template>

<script>
// components
import TextField from '@/components/organisms/form/text-field';

export default {
  name: 'UserCourseResultsNoteField',
  components: {
    TextField,
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
