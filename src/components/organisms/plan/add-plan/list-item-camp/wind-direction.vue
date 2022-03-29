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
        return 'wind-speed--normal';
      case windSpeed < 5:
        return 'wind-speed--strong';
      default:
        return 'wind-speed--danger';
      }
    },
  },
};
</script>

<style lang="scss" scoped>

.wind-speed {
  background-position: center;
  background-size: cover;

  &--normal {
    background-image: url("~@/assets/images/weathers/wind-speed/background-normal.png");
  }

  &--strong {
    background-image: url("~@/assets/images/weathers/wind-speed/background-strong.png");
  }

  &--danger {
    background-image: url("~@/assets/images/weathers/wind-speed/background-danger.png");
  }
}

.wind-direction {
  display: grid;
  align-items: center;
  justify-content: center;

  .wind-speed {
    width: 10px;
    height: 16px;
  }

  span {
    font-size: 12px;
  }
}
</style>
