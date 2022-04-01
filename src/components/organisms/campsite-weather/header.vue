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

.campsite-weather-header {
  padding: 11px;
  background: #f29678;
}

.campsite-name {
  @include title-style;

  margin-bottom: 3px;
  font-size: 16px;
  line-height: 1.2;
  color: #fff;
  text-align: left;

  & > img {
    margin-left: 10px;
  }
}

.campsite-address {
  font-size: 12px;
  font-weight: 300;
  color: #ffffff80;
}
</style>
