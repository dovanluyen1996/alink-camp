<template>
  <div class="wrapper-item">
    <div class="title">
      <slot name="title" />
    </div>

    <div class="content">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CampsitesInfomationTabItem',
  components: {
  },
};
</script>

<style scoped lang="scss">
  .title {
    img {
      margin-left: 5px;
    }
  }

  .wrapper-item {
    width: 100%;
    background-color: #fff;

    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30px;
      font-size: 12px;
      font-weight: 600;
      line-height: 20px;
      border-top: 4px solid #c83200;
      border-bottom: 1px solid #c83200;
    }

    .content {
      padding: 0 10px 10px;
      font-size: 8px;
    }
  }
</style>
