<template>
  <div class="form">
    <slot />
    <div class="form-buttons">
      <slot name="buttons" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseForm',
  props: {
    title: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.form-buttons {
  margin-top: 35px;
  text-align: center;
}
</style>
