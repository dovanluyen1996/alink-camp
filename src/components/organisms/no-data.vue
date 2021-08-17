<template>
  <div class="no-data">
    <div class="no-data-contents">
      <div
        v-if="$slots.actions"
        class="no-data-contents__actions"
      >
        <slot name="actions" />
      </div>
      <div class="no-data-contents__message">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoData',
};
</script>

<style scoped lang="scss">
.no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 30px;
  font-size: 18px;
  font-weight: 600;
}

.no-data-contents {
  position: relative;
  width: 100%;

  &__actions {
    text-align: center;
  }

  &__message {
    text-align: left;
  }

  &__actions + &__message {
    position: absolute;
    bottom: 100%;
    width: 100%;
  }
}
</style>
