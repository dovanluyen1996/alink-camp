<template>
  <div class="courses-forecast-tab">
    <div class="wrapper-table">
      <transition name="fade">
        <hourly-weather v-if="isShownHourly">
          <template #switcher>
            <forecast-switcher :segment-index.sync="segmentIndex" />
          </template>
        </hourly-weather>

        <ten-days-weather v-if="isShownTenDays">
          <template #switcher>
            <forecast-switcher :segment-index.sync="segmentIndex" />
          </template>
        </ten-days-weather>
      </transition>

      <div class="ml-mr-30">
        <a
          v-if="reservationUrl()"
          class="reservation-button button button--large--cta button--rounded"
          @click="openReservationPage()"
        >
          ゴルフコースの予約をする
        </a>
      </div>
    </div>

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
    };
  },
  computed: {
    isShownHourly() {
      return this.segmentIndex === segmentIndexes.hourly;
    },
    isShownTenDays() {
      return this.segmentIndex === segmentIndexes.tenDays;
    },
    course() {
      return this.$store.getters['course/choosenCourse'];
    },
  },
  methods: {
    reservationUrl() {
      return this.course.jalanUrl;
    },
    openReservationPage() {
      this.$helpers.openPageByUrl(this.reservationUrl());
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
  margin: 20px auto 0;
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

.wrapper-table{
  width: 100%;
  margin-bottom: 30px;
  padding: 10px 0 30px;
  background: #fff;
}

.ml-mr-30{
  margin: 0 30px;
}
</style>
