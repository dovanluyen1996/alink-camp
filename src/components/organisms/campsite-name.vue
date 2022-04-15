<template>
  <div class="campsite-name">
    <span class="campsite-name__inner">
      {{ campsiteName }}
    </span>
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

.campsite-name {
  display: grid;
  justify-content: center;
  background-color: $color-white;

  &__inner {
    padding: 15px;
    font-size: 18px;
  }
}
</style>
