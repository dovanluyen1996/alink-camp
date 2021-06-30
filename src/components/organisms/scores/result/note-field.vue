<template>
  <!-- TODO: #344がマージされたらtextareaにする -->
  <text-field
    v-model="inputedValue"
    title="メモ"
  />
</template>

<script>
// components
import TextField from '@/components/organisms/form/text-field';

export default {
  name: 'ScoreResultNoteField',
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
    margin: 0 auto;
    width: 180px;
  }
}
</style>
