<template>
  <v-ons-button
    class="next-button"
    modifier="large"
    @click="onClick()"
  >
    次へ
  </v-ons-button>
</template>

<script>
export default {
  name: 'FirstGuidanceNextButton',
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss" scoped>
.next-button {
  height: 60px;
  font-size: 20px;
  line-height: 54px;
}
</style>
