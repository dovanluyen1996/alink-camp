<template>
  <div class="courses-forecast-tab">
    <transition name="fade">
      <hourly-weather
        v-if="isShownHourly"
        :has-forecast-data.sync="hasForecastData"
      >
        <template #switcher>
          <forecast-switcher
            :segment-index.sync="segmentIndex"
            :segment-disabled="segmentDisabled"
          />
        </template>
      </hourly-weather>

      <ten-days-weather v-if="isShownTenDays">
        <template #switcher>
          <forecast-switcher
            :segment-index.sync="segmentIndex"
            :segment-disabled="segmentDisabled"
          />
        </template>
      </ten-days-weather>
    </transition>

    <a
      :href="reservationUrl()"
      class="reservation-button button button--large--cta button--rounded"
      :target="target()"
    >
      ゴルフコースの予約をする
    </a>

    <monthly-weather />
  </div>
</template>

<script>
// components
import ForecastSwitcher from '@/components/organisms/courses/forecast-tab/forecast-switcher';
import HourlyWeather from '@/components/organisms/courses/forecast-tab/hourly-weather';
import TenDaysWeather from '@/components/organisms/courses/forecast-tab/ten-days-weather';
import MonthlyWeather from '@/components/organisms/courses/forecast-tab/monthly-weather';

const segmentIndexes = {
  hourly: 0,
  tenDays: 1,
};

export default {
  name: 'CoursesForecastTab',
  components: {
    ForecastSwitcher,
    HourlyWeather,
    TenDaysWeather,
    MonthlyWeather,
  },
  data() {
    return {
      segmentIndex: segmentIndexes.hourly,
      hasForecastData: true,
      segmentDisabled: false,
    };
  },
  computed: {
    isShownHourly() {
      return this.segmentIndex === segmentIndexes.hourly;
    },
    isShownTenDays() {
      return this.segmentIndex === segmentIndexes.tenDays;
    },
  },
  watch: {
    hasForecastData() {
      this.segmentIndex = this.hasForecastData ? segmentIndexes.hourly : segmentIndexes.tenDays;
      this.segmentDisabled = !this.hasForecastData;
    },
  },
  methods: {
    reservationUrl() {
      const course = this.$store.getters['course/choosenCourse'];
      return course.jalaUrl;
    },
    target() {
      return (cordova.platformId === 'browser') ? '_self' : '_blank';
    },
  },
};
</script>

<style scoped lang="scss">
.courses-forecast-tab {
  overflow: hidden;
}

.forecast-switcher {
  display: flex;
  width: 95%;
  margin: 15px auto;
}

.reservation-button {
  width: 95%;
  margin: 20px auto 40px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  position: absolute;
  top: 0;
  width: 100%;
  opacity: 0;
}

/deep/ ons-segment[disabled] {
  opacity: 1;
}
</style>
