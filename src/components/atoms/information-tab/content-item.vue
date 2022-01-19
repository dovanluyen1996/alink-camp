<template>
  <div class="wrapper-content-item">
    <div class="sub-title">
      <slot name="sub-title">
      </slot>
    </div>

    <div class="sub-content">
      <slot name="sub-content">
      </slot>
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
    font-size: 8px;
    font-weight: 600;
    border-bottom: 1px solid #c83200;
  }

  .sub-content {
    padding-top: 10px;
    font-size: 8px;
  }
}
</style>
