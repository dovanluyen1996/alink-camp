<template>
  <transition name="fade">
    <div
      v-if="visible"
      animation="fade"
      class="loading"
    >
      <img
        :src="require('@/assets/images/spinner.png')"
        alt=""
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

.loading {
  position: fixed;
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
    max-width: 115px;
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
</style>
