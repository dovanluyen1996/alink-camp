<template>
  <div class="wrapper-item">
    <div class="title">
      特徴
    </div>

    <div class="content">
      <div class="content-body">
        筑波山の中腹にあるキャンプ場。山の斜面にテントサイトやBBQサイトがあり、登山のベースキャンプとしても気軽に利用できる。
        広大な施設内では数多くの植物が見られ、自然を思いっきり満喫できる。
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CampsitesInformationFeatureTab',
};
</script>

<style scoped lang="scss">
  .content-body {
    margin-top: 15px;
  }

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
      font-size: 12px;
    }
  }
</style>
