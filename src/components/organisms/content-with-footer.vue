<!-- NOTE: 状況によって fixed-footer.vue と使い分け 詳細はfixed-footer.vueに記載 -->
<template>
  <div class="content-with-footer">
    <div
      :style="contentStyle"
      class="content-with-footer__content"
    >
      <slot />
    </div>
    <div class="content-with-footer__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentWithFooter',
  data() {
    return {
      contentStyle: {
        paddingBottom: 0,
      },
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.setContentMargin();
    });
  },
  methods: {
    setContentMargin() {
      const footerHeight = this.$el.querySelector('.content-with-footer__footer').offsetHeight;

      // NOTE: コンテンツにフッターが被らないようにpaddingを取る
      this.contentStyle = {
        paddingBottom: `${footerHeight - 1}px`,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.content-with-footer {
  position: relative;
  height: 100%;
  // NOTE: contentの見切れ対策のためfooterをbottom: -1してるためスワイプについて来てしまうのを防止
  overflow: hidden;

  &__content {
    box-sizing: border-box;
    height: 100%;
    overflow: auto;
  }

  &__footer {
    position: absolute;
    // NOTE: 背景色がついた場合にdevice pixel ratioによって
    //       後ろが見切れるのを防止するため-1
    bottom: -1px;
    left: 0;
    z-index: 10;
    width: 100%;
    padding: 16px 0;
    text-align: center;
    -webkit-transform: translate3d(0, 0, 0);

    /deep/ {
      .button {
        box-shadow: 0 5px 5px rgba(0, 0, 0, 0.4);
      }

      .button[class*="button--large"] {
        width: auto;
        margin: 0 30px;
        font-weight: bold;
        color: #fff;
        background-color: #a82e05;
      }
    }
  }
}
</style>
