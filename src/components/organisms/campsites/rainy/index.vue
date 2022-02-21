<template>
  <div class="rainy-tab">
    <div class="rainy-wrapper">
      <v-ons-button
        @click="goToMap()"
      >
        雨雲の動きを確認
      </v-ons-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CampsiteRainyTab',
  computed: {
    campsite() {
      return this.$store.getters['campsite/choosenCampsite'];
    },
  },
  methods: {
    goToMap() {
      this.$helpers.openPageByUrl(`${process.env.MAP_URL}?lat=${this.campsite.latitude}&lon=${this.campsite.longitude}`);
    },
  },
};
</script>

<style scoped lang="scss">
  .rainy-tab {
    .rainy-wrapper {
      padding: 20px 10px 30px;
      margin-bottom: 30px;
      background-color: #fff;
    }
  }
</style>
