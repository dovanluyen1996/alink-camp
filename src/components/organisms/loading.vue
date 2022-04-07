<template>
  <transition name="fade">
    <div
      v-if="visible"
      animation="fade"
      class="loading"
    >
      <img
        :src="require('@/assets/images/spinner.png')"
        class="fa-spin"
      >
      <span>Now Loading...</span>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/onsen-override/base-layout/_variables.scss';
@import '@/assets/scss/onsen-override/base-layout/iphonex-support/_variables.scss';

.loading {
  position: absolute;
  top: $--toolbar-height;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10002 !important;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.95);

  img {
    width: 80%;
    max-width: 111px;
    height: auto;
    margin-bottom: 18px;
    font-size: 18px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.page[status-bar-fill] > .loading {
  top: $--toolbar-height + 20px;
}

@media (orientation: portrait) {
  html[onsflag-iphonex-portrait] .loading {
    top: $--iphonex-safe-area-inset-top-portrait + $--toolbar-height;
  }
}
</style>
