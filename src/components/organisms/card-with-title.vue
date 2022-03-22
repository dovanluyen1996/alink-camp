<template>
  <div class="card-width-title">
    <div
      v-if="$slots.title"
      class="card-title"
    >
      <slot name="title" />
    </div>

    <slot name="section" />

    <v-ons-card>
      <div class="content">
        <slot />
      </div>
    </v-ons-card>
  </div>
</template>

<script>
export default {
  name: 'CardWithTitle',
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_mixins.scss';

.card-width-title[fullscreen] {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card {
  flex: 1;
  overflow: auto;
}

.card-title {
  @include title-style;

  margin-top: 25px;

  + .card {
    margin-top: 14px;
  }
}

</style>
