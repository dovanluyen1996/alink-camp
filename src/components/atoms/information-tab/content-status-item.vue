<template>
  <div class="wrapper">
    <div class="text">
      <slot name="text" />
    </div>

    <div class="status">
      <slot name="status" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CampsitesInformationContenItemTab',
};
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: space-between;

  .status {
    width: 80px;
    text-align: center;
  }
}
</style>
