<template>
  <div class="wrapper-content-item">
    <div class="sub-title">
      <slot name="sub-title" />
    </div>

    <div class="sub-content">
      <slot name="sub-content" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CampsitesInformationContenItemTab',
};
</script>

<style scoped lang="scss">
.wrapper-content-item {
  margin-top: 15px;
  line-height: 14px;

  .sub-title {
    font-size: 12px;
    font-weight: 600;
    border-bottom: 1px solid #c83200;
  }

  .sub-content {
    padding-top: 10px;
    font-size: 12px;
  }
}
</style>
