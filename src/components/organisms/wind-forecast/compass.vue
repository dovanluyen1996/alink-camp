<template>
  <div class="compass">
    <div class="compass-frame">
      <div
        class="wind-direction wind-speed"
        :class="[windSpeedRate, windDirectionDeg]"
      />
    </div>
    <div class="wind-info">
      風速：<span>{{ windSpeed }}</span> m/s <br>
    </div>
  </div>
</template>

<script>
import settings from '@/config/settings';

const { directions } = settings.views;

export default {
  name: 'Compass',
  data() {
    return {
      windSpeed: 0,
      windDirection: '東',
    };
  },
  computed: {
    windSpeedRate() {
      const speed = this.windSpeed;

      // Unit of measurement: m/s
      switch (true) {
      case (speed < 2):
        return 'wind-speed--normal';
      case (speed < 5):
        return 'wind-speed--strong';
      default:
        return 'wind-speed--danger';
      }
    },
    windDirectionDeg() {
      // the rule is: North direction is corresponding to 0deg
      // so, difference between compass's rules and css's root rule is 90deg
      const deg = Math.floor(directions[this.windDirection] - 90);

      return `wind-direction--${deg}-deg`;
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_mixins.scss';

$degrees: 0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5;

.compass-frame {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 320px;
  height: 320px;
  background-image: url('~@/assets/images/weathers/compass.png');
  background-position: center;
  background-size: cover;
}

.wind-direction {
  width: 155px;
  height: 95px;
  transition: transform 0.5s ease-out, background-image 0.5s ease-out;

  @each $degree in $degrees {
    // generate class has partern: wind-direction--xx-deg
    &--#{floor($degree - 90)}-deg {
      transform: rotate(#{$degree - 90}deg);
    }
  }
}

.wind-speed {
  background-position: center;
  background-size: cover;

  &--normal {
    background-image: url('~@/assets/images/weathers/wind-speed/normal.png');
  }

  &--strong {
    background-image: url('~@/assets/images/weathers/wind-speed/strong.png');
  }

  &--danger {
    background-image: url('~@/assets/images/weathers/wind-speed/danger.png');
  }
}

.wind-info {
  @include title-style;

  margin-top: 30px;
  margin-bottom: 20px;

  span {
    font-size: 40px;
  }
}
</style>
