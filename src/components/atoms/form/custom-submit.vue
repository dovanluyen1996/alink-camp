<template>
  <v-ons-button
    :style="{width}"
    modifier="cta"
    @click="handleClickButton"
  >
    <slot />
  </v-ons-button>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '200px',
    },
  },
  methods: {
    handleClickButton() {
      this.$emit('click');
    },
  },
};
</script>
