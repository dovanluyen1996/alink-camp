<template>
  <image-field
    v-model="selectedFile"
    title="写真"
  />
</template>

<script>
// components
import ImageField from '@/components/organisms/form/image-field';

export default {
  name: 'ScoreResultImageField',
  components: {
    ImageField,
  },
  props: {
    value: {
      type: [String, Object],
      default: () => '',
      required: true,
    },
  },
  computed: {
    selectedFile: {
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
