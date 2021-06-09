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
.input-field-title {
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  ~ .input-field-card {
    margin-top: 14px;
  }
}
.input-field-card {
  padding: 19px 20px 18px;
  /deep/ {
    ons-input,
    ons-select,
    ons-search-input {
      width: 100%;
    }
  }
}
</style>
