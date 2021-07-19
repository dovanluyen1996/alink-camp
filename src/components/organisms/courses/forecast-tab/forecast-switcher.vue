<template>
  <v-ons-segment
    :index.sync="activeIndex"
    class="forecast-switcher"
    :class="{ 'segment--disabled': segmentDisabled }"
    :disabled="segmentDisabled"
  >
    <button
      class="segment__item"
      :class="{ 'segment__item--active': activeIndex === 0 }"
    >
      時間ごと
    </button>
    <button
      class="segment__item"
      :class="{ 'segment__item--active': activeIndex === 1 }"
    >
      10日間
    </button>
  </v-ons-segment>
</template>

<script>
export default {
  name: 'CoursesForecastTabForecastSwitcher',
  props: {
    segmentIndex: {
      type: Number,
      default: 0,
    },
    segmentDisabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    activeIndex: {
      get() {
        return this.segmentIndex;
      },
      set(newValue) {
        this.$emit('update:segmentIndex', newValue);
      },
    },
  },
};
</script>

<style scoped lang="scss">
.forecast-switcher {
  display: flex;
  width: 95%;
  margin: 15px auto;
}

.segment--disabled {
  opacity: 1;

  .segment__item:not(.segment__item--active) {
    opacity: 0.5;
  }
}
</style>
