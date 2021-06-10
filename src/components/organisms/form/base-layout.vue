<template>
  <div class="input-field">
    <div
      v-if="title"
      class="input-field-title"
    >
      {{ title }}
    </div>
    <v-ons-card class="input-field-card">
      <slot />
    </v-ons-card>
  </div>
</template>

<script>
export default {
  name: 'InputBaseLayout',
  props: {
    title: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_mixins.scss';

.input-field-title {
  @include title-style;

  margin-top: 20px;
}

.input-field-card {
  padding: 19px 20px 18px;

  .input-field-title ~ & {
    margin-top: 14px;
  }

  /deep/ {
    ons-input,
    ons-select,
    ons-search-input {
      width: 100%;
    }
  }
}
</style>
