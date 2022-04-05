<template>
  <div
    v-if="windSpeed"
    class="wind-direction"
  >
    <template v-if="windSpeed > 0">
      <div
        :class="['wind-speed', windSpeedRate(windSpeed)]"
        :style="windDirectionStyle"
      />
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
  },
  methods: {
    windSpeedRate(windSpeed) {
      // Unit of measurement: m/s
      switch (true) {
      case windSpeed < 2:
        return 'wind-speed--light';
      case windSpeed < 5:
        return 'wind-speed--middle';
      default:
        return 'wind-speed--strong';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.wind-direction {
  display: grid;
  align-items: center;
  justify-content: center;

  span {
    font-size: 12px;
  }
}

.wind-speed {
  width: 14px;
  height: 14px;
  background-position: center;
  background-size: cover;

  &--light {
    background-image: url("~@/assets/images/weathers/wind-speed/background-light.png");
  }

  &--middle {
    background-image: url('~@/assets/images/weathers/wind-speed/background-middle.png');
  }

  &--strong {
    background-image: url("~@/assets/images/weathers/wind-speed/background-strong.png");
  }
}

</style>
