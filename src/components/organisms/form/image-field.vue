<template>
  <base-field
    :title="title"
    class="image-field"
  >
    <custom-image-upload
      v-model="selectedFile"
      :errors="errors"
    />
  </base-field>
</template>

<script>
import CustomImageUpload from '@/components/atoms/form/custom-image-upload';
import BaseField from './base-field';

export default {
  name: 'ImageField',
  components: {
    CustomImageUpload,
    BaseField,
  },
  props: {
    value: {
      type: [String, Object],
      default: () => '',
      required: true,
    },
    title: {
      type: String,
      default: null,
    },
    errors: {
      type: Array,
      default: () => [],
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
/deep/ .upload-button {
  margin-bottom: -20px;
}
</style>
