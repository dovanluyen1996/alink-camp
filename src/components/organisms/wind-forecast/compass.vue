<template>
  <div class="compass">
    <div
      class="compass-frame"
      :style="compassHeadingStyle"
    >
      <div
        v-if="windSpeed > 0.0"
        class="wind-direction wind-speed"
        :class="[windSpeedRate]"
        :style="windDirectionStyle"
      />
    </div>
    <p
      v-if="isUsingJS"
      class="compass-warning"
    >
      コンパスの精度が低い状態です
    </p>
    <div class="wind-info">
      風速：<span class="wind-speed">{{ windSpeed }}</span> m/s <br>
      <span class="wind-speed-location">（高さ10m付近の風）</span>
    </div>
  </div>
</template>

<script>
import settings from '@/config/settings';

const { windDirections } = settings.views;

export default {
  name: 'Compass',
  props: {
    forecastWind: {
      type: Object,
      required: true,
    },
    compassErrorVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      windSpeed: 0,
      windDirection: '南',
      windDirectionDeg: 0,
      compassHeading: 0,
      compassHeadingDeg: 0,
      watchId: null,
      isUsingJS: false,
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
    windDirectionHeading() {
      return windDirections[this.windDirection];
    },
    compassHeadingStyle() {
      return {
        transform: `rotate(${this.compassHeadingDeg}deg)`,
      };
    },
    windDirectionStyle() {
      return {
        transform: `rotate(${this.windDirectionDeg}deg)`,
      };
    },
  },
  watch: {
    forecastWind() {
      this.windSpeed = this.forecastWind.windSpeed;
      this.windDirection = this.forecastWind.windDirection;
    },
    compassHeading(newValue, oldValue) {
      this.compassHeadingDeg += this.calDelta(newValue, oldValue);
    },
    windDirectionHeading(newValue, oldValue) {
      this.windDirectionDeg += this.calDelta(newValue, oldValue);
    },
  },
  methods: {
    getCompassHeadingByJS(event) {
      // If can use webkitCompassHeading -> use webkitCompassHeading
      // If can not use webkitCompassHeading -> calculate Heading by alpha, beta, gamma
      if (event.webkitCompassHeading) {
        this.compassHeading = 360 - event.webkitCompassHeading;
      } else {
        // Androidのalphaは反時計回り
        this.compassHeading = 360 - this.calCompassHeadingBy(event.alpha, event.beta, event.gamma);
      }
    },
    calCompassHeadingBy(alpha, beta, gamma) {
      const degtorad = Math.PI / 180; // Degree-to-Radian conversion

      const x = beta ? beta * degtorad : 0; // beta value
      const y = gamma ? gamma * degtorad : 0; // gamma value
      const z = alpha ? alpha * degtorad : 0; // alpha value

      const cY = Math.cos(y);
      const cZ = Math.cos(z);
      const sX = Math.sin(x);
      const sY = Math.sin(y);
      const sZ = Math.sin(z);

      // Calculate Vx and Vy components
      const Vx = (-cZ * sY) - (sZ * sX * cY);
      const Vy = (-sZ * sY) + (cZ * sX * cY);

      // Calculate compass heading
      let compassHeading = Math.atan(Vx / Vy);

      // Convert compass heading to use whole unit circle
      if (Vy < 0) {
        compassHeading += Math.PI;
      } else if (Vx < 0) {
        compassHeading += 2 * Math.PI;
      }

      return compassHeading * (180 / Math.PI);
    },
    startWatch() {
      // 優先度で角度を取得する
      // 1. navigator.compass
      // 2. webkitCompassHeading
      // 3. 補正した alpha
      const options = { frequency: 500 };

      this.watchId = navigator.compass.watchHeading(
        this.getCompassHeading,
        this.compassError,
        options,
      );
    },
    stopWatch() {
      if (this.$ons.platform.isIOS()) {
        navigator.compass.clearWatch(this.watchId);
      } else if (this.$ons.platform.isAndroid() && this.watchId) {
        navigator.compass.clearWatch(this.watchId);
      } else if (this.$ons.platform.isAndroid() && !this.watchId) {
        window.removeEventListener('deviceorientation', this.getCompassHeadingByJS);
      }
    },
    getCompassHeading(heading) {
      this.isUsingJS = false;
      this.compassHeading = 360 - heading.magneticHeading;
    },
    compassError() {
      // Android device: If can not use Cordova navigator compass library, use Javascript
      // iOS: Show error message
      if (this.$ons.platform.isAndroid()) {
        this.isUsingJS = true;
        window.addEventListener('deviceorientation', this.getCompassHeadingByJS);
      } else {
        this.$emit('update:compassErrorVisible', true);
      }
    },
    calDelta(newValue, oldValue) {
      let delta = newValue - oldValue;
      if (delta > 180) {
        delta -= 360;
      } else if (delta < -180) {
        delta += 360;
      }

      return delta;
    },
  },

};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_mixins.scss';
@import '@/assets/scss/_variables.scss';

$speed-degrees: 0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180,
  202.5, 225, 247.5, 270, 292.5, 315, 337.5;

.compass {
  width: 100%;
}

.compass-frame {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85%;
  max-width: 320px;
  height: auto;
  max-height: 320px;
  margin: 0 auto;
  background-image: url('~@/assets/images/weathers/background-compass.png');
  background-position: center;
  background-size: cover;
  transition: transform 0.5s ease-out;

  &::after {
    display: block;
    padding-bottom: 100%;
    content: "";
  }
}

.wind-direction {
  width: 95px;
  height: 155px;
  transition: transform 0.5s ease-out, background-image 0.5s ease-out;

  @each $degree in $speed-degrees {
    // generate class has partern: wind-direction--xx-deg
    &--#{floor($degree)}-deg {
      transform: rotate(#{$degree}deg);
    }
  }
}

.wind-speed {
  background-position: center;
  background-size: cover;

  &--normal {
    background-image: url('~@/assets/images/weathers/wind-speed/background-normal.png');
  }

  &--strong {
    background-image: url('~@/assets/images/weathers/wind-speed/background-strong.png');
  }

  &--danger {
    background-image: url('~@/assets/images/weathers/wind-speed/background-danger.png');
  }
}

.wind-info {
  @include title-style;

  margin-top: 30px;
  margin-bottom: 20px;

  .wind-speed {
    font-size: 40px;
  }

  .wind-speed-location {
    font-size: 14px;
    font-weight: normal;
  }
}

.compass-warning {
  display: block;
  padding-top: 20px;
  color: $color-error-msg;
  text-align: center;
}

</style>
