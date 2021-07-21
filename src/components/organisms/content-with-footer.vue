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
        paddingBottom: `${footerHeight}px`,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.content-with-footer {
  position: relative;
  height: 100%;

  &__content {
    box-sizing: border-box;
    height: 100%;
    overflow: auto;
  }

  &__footer {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    padding: 16px 0;
    text-align: center;

    /deep/ {
      .button[class*="button--large"] {
        width: auto;
        margin: 0 30px;
        font-size: 20px;
        font-weight: 600;
        color: #fff;
        background-color: #ffc134;
      }
    }
  }
}

.content-with-footer[class*="guidance-content"] {
  padding: 0 16px;
  color: #fff;
  background-color: #256c14;

  .content-with-footer__content {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;

    p {
      margin-top: 28px;
      font-size: 16px;
      font-weight: 600;
      line-height: 1.5;
    }
  }
}
</style>
