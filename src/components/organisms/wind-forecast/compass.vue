<template>
  <div class="compass">
    <div
      class="compass-frame"
      :style="compassHeadingStyle"
    >
      <div
        class="wind-direction wind-speed"
        :class="[windSpeedRate]"
        :style="windDirectionStyle"
      />
    </div>
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
      windDirection: '北',
      windDirectionDeg: 0,
      compassHeading: 0,
      compassHeadingDeg: 0,
      watchId: null,
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
    getCompassHeadingForAndroid(event) {
      if (event.webkitCompassHeading) {
        // some devices don't understand "alpha" (especially IOS devices)
        this.compassHeading = 360 - event.webkitCompassHeading;
      } else {
        this.compassHeading = 360 - this.headingForAndroidBy(event.alpha, event.beta, event.gamma);
      }
    },
    headingForAndroidBy(alpha, beta, gamma) {
      // Convert degrees to radians
      const alphaRad = alpha * (Math.PI / 180);
      const betaRad = beta * (Math.PI / 180);
      const gammaRad = gamma * (Math.PI / 180);

      // Calculate equation components
      const cA = Math.cos(alphaRad);
      const sA = Math.sin(alphaRad);
      const sB = Math.sin(betaRad);
      const cG = Math.cos(gammaRad);
      const sG = Math.sin(gammaRad);

      // Calculate A, B, C rotation components
      const rA = (-cA * sG) - (sA * sB * cG);
      const rB = (-sA * sG) + (cA * sB * cG);

      // Calculate compass heading
      let compassHeading = Math.atan(rA / rB);

      // Convert from half unit circle to whole unit circle
      if (rB < 0) {
        compassHeading += Math.PI;
      } else if (rA < 0) {
        compassHeading += 2 * Math.PI;
      }

      // Convert radians to degrees
      compassHeading *= 180 / Math.PI;

      return compassHeading;
    },
    startWatchForIOS() {
      const options = { frequency: 500 };

      if (!navigator.compass) this.compassError();
      this.watchId = navigator.compass.watchHeading(
        this.getCompassHeadingForIOS,
        this.compassError,
        options,
      );
    },
    startWatchForAndroid() {
      DeviceOrientationEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', this.getCompassHeadingForAndroid);
          } else {
            this.compassError();
          }
        })
        .catch(() => {
          this.compassError();
        });
    },
    startWatch() {
      if (this.$ons.platform.isIOS()) {
        this.startWatchForIOS();
      } else if (this.$ons.platform.isAndroid()) {
        this.startWatchForAndroid();
      }
    },
    stopWatch() {
      if (this.$ons.platform.isIOS()) {
        navigator.compass.clearWatch(this.watchId);
      } else {
        window.removeEventListener('deviceorientation', this.getCompassHeadingForAndroid);
      }
    },
    getCompassHeadingForIOS(heading) {
      this.compassHeading = 360 - heading.magneticHeading;
    },
    compassError() {
      this.$emit('update:compassErrorVisible', true);
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
</style>
