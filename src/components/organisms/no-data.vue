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
  font-weight: bold;
  text-align: center;
}

@media screen and (max-width: 330px) {
  .no-data {
    padding: 0 20px;
  }
}

.no-data-contents {
  position: relative;
  width: 100%;

  &__actions + &__message {
    position: absolute;
    bottom: 100%;
    width: 100%;
  }
}
</style>
