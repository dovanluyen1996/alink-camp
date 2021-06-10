<template>
  <v-ons-button
    :style="{width}"
    modifier="cta"
    @click="clickButton"
  >
    <slot />
  </v-ons-button>
</template>

<script>
export default {
  name: 'CustomSubmit',
  props: {
    width: {
      type: String,
      default: '200px',
    },
  },
  methods: {
    clickButton() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  text-align: center;
}
</style>
