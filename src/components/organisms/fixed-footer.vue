<template>
  <!--
    WARNING:
    .page__content の直下にレンダリングされるように設置してください
    slotの中身にimgなどがありレンダリングに遅延が起こる場合は
    heightを指定しないとコンテンツとフッターがかぶります
  -->
  <div class="fixed-footer">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FixedFooter',
  mounted() {
    this.setFooterMargin();
  },
  methods: {
    setFooterMargin() {
      // NOTE: コンテンツとフッターが被らないようにフッターの高さ分親にpaddingを取る
      this.$parent.$once('hook:mounted', () => {
        this.$el.closest('.page').querySelector('.page__content').style.paddingBottom = `${this.$el.offsetHeight}px`;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.fixed-footer {
  position: fixed;
  bottom: 0;
  z-index: 10;
  width: 100%;
  padding: 16px 0;
  text-align: center;

  /deep/ {
    .button[class*="button--large"] {
      width: 75%;
      max-width: 280px;
      margin-right: auto;
      margin-left: auto;
    }
  }
}
</style>
