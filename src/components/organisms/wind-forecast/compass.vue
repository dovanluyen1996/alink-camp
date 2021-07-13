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

const { windDirections } = settings.views;

export default {
  name: 'Compass',
  props: {
    course: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      forecastWind: {},
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
      const deg = Math.floor(windDirections[this.windDirection]);

      return `wind-direction--${deg}-deg`;
      // TODO 角度によって動きが不自然になります。Refactorしてください。(issue #404)
    },
  },
  watch: {
    forecastWind() {
      this.windSpeed = this.forecastWind.windSpeed;
      this.windDirection = this.forecastWind.windDirection;
    },
  },
  async created() {
    this.forecastWind = await this.getForecastWind();
  },
  methods: {
    getForecastWind() {
      const params = {
        course_id: this.course.id,
        target_date: this.$moment().format('YYYY-MM-DD'),
      };
      return this.$store.dispatch('models/weather/getForecastWind', params);
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
  background-image: url('~@/assets/images/weathers/background-compass.png');
  background-position: center;
  background-size: cover;
}

.wind-direction {
  width: 95px;
  height: 155px;
  transition: transform 0.5s ease-out, background-image 0.5s ease-out;

  @each $degree in $degrees {
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

  span {
    font-size: 40px;
  }
}
</style>
