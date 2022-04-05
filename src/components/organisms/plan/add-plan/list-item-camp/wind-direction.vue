<template>
  <div
    v-if="windSpeed"
    class="wind-direction"
  >
    <template v-if="windSpeed > 0">
      <img
        :src="image"
        :style="windDirectionStyle"
        :alt="windDirection"
        class="wind-speed"
        width="14px"
        height="14px"
      >
      <span>{{ windSpeed }}</span>
    </template>
    <template v-else>
      {{ windDirection }}
    </template>
  </div>
  <div
    v-else
    class="wind-direction"
  >
    --
  </div>
</template>

<script>
import settings from '@/config/settings';

const LightWindImage = require('@/assets/images/weathers/wind-speed/background-light.png');
const MiddleWindImage = require('@/assets/images/weathers/wind-speed/background-middle.png');
const StrongWindImage = require('@/assets/images/weathers/wind-speed/background-strong.png');

const { windDirections } = settings.views;
export default {
  name: 'WindDirection',
  props: {
    windSpeed: {
      type: Object,
      required: true,
    },
    windDirection: {
      type: Object,
      required: true,
    },
  },
  computed: {
    windDirectionHeading() {
      return windDirections[this.windDirection];
    },
    windDirectionStyle() {
      return {
        transform: `rotate(${this.windDirectionHeading}deg)`,
      };
    },
    image() {
      // Unit of measurement: m/s
      if (this.windSpeed < 2) return LightWindImage;

      if (this.windSpeed < 5) return MiddleWindImage;

      return StrongWindImage;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.wind-direction {
  display: grid;
  align-items: center;
  justify-content: center;

  span {
    font-size: $font-size-small;
  }
}

.wind-speed {
  margin-bottom: 3px;
}

</style>
