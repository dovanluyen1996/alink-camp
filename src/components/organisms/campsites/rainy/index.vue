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
import settings from '@/config/settings';

export default {
  name: 'CampsiteRainyTab',
  computed: {
    campsite() {
      return this.$store.getters['campsite/choosenCampsite'];
    },
  },
  methods: {
    goToMap() {
      const storageKey = settings.localStorage.keys.session;
      const session = JSON.parse(localStorage.getItem(storageKey));
      const params = `lat=${this.campsite.latitude}&lon=${this.campsite.longitude}&uid=${session.uid}&access-token=${session['access-token']}&client=${session.client}`;
      this.$helpers.openPageByUrl(`${process.env.MAP_URL}?${params}`);
    },
  },
};
</script>

<style scoped lang="scss">
  .rainy-tab {
    .rainy-wrapper {
      display: flex;
      justify-content: center;
      padding: 20px 10px 30px;
      margin-bottom: 30px;
      background-color: #fff;
    }
  }
</style>
