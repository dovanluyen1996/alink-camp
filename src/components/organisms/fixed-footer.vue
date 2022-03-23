<!-- WARNING: このコンポーネントはv-ons-pageの直下になるように配置する -->
<template>
  <div class="fixed-footer">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FixedFooter',
  mounted() {
    this.$nextTick(() => {
      this.setContentMargin();
    });
  },
  methods: {
    setContentMargin() {
      // NOTE: コンテンツにフッターが被らないように.page__contentにpaddingを取る
      const footerHeight = this.$el.offsetHeight;
      const siblingsArray = [...this.$el.closest('.page').childNodes];
      const pageContent = siblingsArray.find(elm => elm.classList && elm.classList.contains('page__content'));

      pageContent.style.paddingBottom = `${footerHeight}px`;
    },
  },
};
</script>

<style scoped lang="scss">
.fixed-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  padding: 16px 0;
  text-align: center;
  -webkit-transform: translate3d(0, 0, 0);

  /deep/ {
    .button[class*="button--large"] {
      width: auto;
      margin: 0 30px;
      font-size: 20px;
      font-weight: 600;
      color: #fff;
      background-color: #a82e05;
    }
  }
}
</style>
