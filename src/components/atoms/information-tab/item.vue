<template>
  <div class="wrapper-item">
    <div
      class="title"
      @click="toggleContentItem"
    >
      <slot
        name="title"
      />
      <img
        v-if="isShowContentItem"
        src="@/assets/images/icon-circle-minus.png"
        width="16px"
        height="16px"
      >
      <img
        v-else
        src="@/assets/images/icon-circle-plus.png"
        width="16px"
        height="16px"
      >
    </div>

    <div
      v-show="isShowContentItem"
      class="content"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CampsitesInformationTabItem',
  data() {
    return {
      isShowContentItem: true,
    };
  },
  methods: {
    toggleContentItem() {
      this.isShowContentItem = !this.isShowContentItem;
    },
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
      justify-content: flex-end;
      height: 30px;
      padding-right: calc(50% - 35px);
      font-size: 12px;
      font-weight: bold;
      border-top: 4px solid #c83200;
      border-bottom: 1px solid #c83200;
    }

    .content {
      padding: 0 10px 10px;
      font-size: 12px;
    }
  }
</style>
