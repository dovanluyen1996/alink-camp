<template>
  <div class="weather-index">
    <div :class="['weather-index-title', {'weather-index-title--unpaid' : !isPurchased}]">
      {{ title }}
    </div>
    <img
      :src="image"
      width="42px"
    >
    <div
      v-if="isPurchased"
      class="weather-index-label"
    >
      {{ label }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CampsiteWeatherIndexesBase',
  props: {
    isPurchased: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.weather-index {
  flex-wrap: nowrap;
  font-size: $font-size-small;
  color: #007540;
}

.weather-index-title {
  padding-bottom: 8px;
  font-size: $font-size-small;
  font-weight: bold;

  &--unpaid {
    color: $color-disabled;
  }
}

.weather-index-label {
  padding: 0 5px;
  margin-top: 10px;
}
</style>
