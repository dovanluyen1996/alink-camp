<template>
  <v-ons-segment
    :index.sync="activeIndex"
    class="forecast-switcher"
  >
    <button>時間ごと</button>
    <button>10日間</button>
  </v-ons-segment>
</template>

<script>
export default {
  name: 'CampsitesForecastTabForecastSwitcher',
  props: {
    segmentIndex: {
      type: Number,
      default: 0,
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

/deep/ {
  .segment__button {
    color: #ed6538;
    border-color: #ed6538;
  }

  :checked + .segment__button {
    background-color: #ed6538;
  }
}
</style>
