<template>
  <div class="campsite-weather-header">
    <div class="campsite-name">
      {{ campsite.name }}
      <img
        v-if="isFavorite"
        src="@/assets/images/user/campsite/favorite.png"
        width="18px"
      >
    </div>
    <div class="campsite-address">
      {{ campsite.address }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CampsiteWeatherHeader',
  props: {
    campsite: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isFavorite() {
      return this.$store.getters['models/usersFavorite/findByCampsiteId'](this.campsite.id);
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_mixins.scss';

.campsite-name {
  @include title-style;

  display: inline-block;
  margin-bottom: 3px;
  text-align: left;
}

.campsite-address {
  color: #888;
}
</style>
