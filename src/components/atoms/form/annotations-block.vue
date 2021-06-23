<template>
  <div class="annotations-block">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'AnnotationsBlock',
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.annotations-block {
  font-size: $font-size-small;
  color: $color-subtext;
}
</style>
