<template>
  <v-ons-toolbar>
    <div class="left">
      <slot name="left">
        <v-ons-back-button />
      </slot>
    </div>
    <div class="center">
      <slot>{{ title }}</slot>
    </div>
    <div class="right">
      <slot name="right" />
    </div>
  </v-ons-toolbar>
</template>

<script>
export default {
  inject: ['navigator'],
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>
