<template>
  <div class="no-data">
    <div class="no-data-contents">
      <div class="no-data-contents__message">
        <slot />
      </div>
      <v-ons-button
        modifier="cta"
        @click="goToCourseSearch"
      >
        早速コース検索
      </v-ons-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoData',
  methods: {
    goToCourseSearch() {
      this.$store.commit('appTabbar/setActiveIndexFromTabName', 'courseSearch');
    },
  },
};
</script>

<style scoped lang="scss">
.no-data {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 30px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
}

.no-data-contents {
  position: relative;
  width: 100%;

  &__message {
    position: absolute;
    bottom: 100%;
    width: 100%;
  }
}
</style>
