<template>
  <div class="text">
    <v-ons-row class="text__desc">
      {{ campsiteName }}
    </v-ons-row>
  </div>
</template>

<script>
export default {
  name: 'CampsiteName',
  props: {
    campsiteName: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.text {
  display: grid;
  justify-content: center;
  background-color: $color-white;

  &__desc {
    padding: 15px;
    font-size: 18px;
  }
}
</style>
