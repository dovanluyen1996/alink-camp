<template>
  <div class="card-width-title">
    <div
      v-if="$slots.title"
      class="card-title"
    >
      <slot name="title" />
    </div>
    <v-ons-card>
      <slot />
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

.card-title {
  @include title-style;

  margin-top: 25px;
}

.card {
  margin-top: 14px;
}
</style>
