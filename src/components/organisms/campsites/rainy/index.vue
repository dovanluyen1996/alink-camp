<template>
  <div class="rainy-tab">
    <div class="rainy-wrapper">
      <img src="@/assets/images/rainy.png">
    </div>
  </div>
</template>

<script>
export default {
  name: 'CampsiteRainyTab',
};
</script>

<style scoped lang="scss">
  .rainy-tab {
    .rainy-wrapper {
      padding: 20px 10px 30px;
      margin-bottom: 30px;
      background-color: #fff;

      img {
        width: 100%;
      }
    }
  }
</style>
