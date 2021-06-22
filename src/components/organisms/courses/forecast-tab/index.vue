<template>
  <div class="courses-forecast-tab">
    <transition name="fade">
      <hourly-weather v-if="isShownHourly">
        <template #switcher>
          <v-ons-segment
            :index.sync="segmentIndex"
            class="forecast-switcher"
          >
            <button>時間ごと</button>
            <button>10日間</button>
          </v-ons-segment>
        </template>
      </hourly-weather>

      <ten-days-weather v-if="isShownTenDays">
        <template #switcher>
          <v-ons-segment
            :index.sync="segmentIndex"
            class="forecast-switcher"
          >
            <button>時間ごと</button>
            <button>10日間</button>
          </v-ons-segment>
        </template>
      </ten-days-weather>
    </transition>

    <v-ons-button
      modifier="large--cta rounded"
      class="reservation-button"
    >
      ゴルフコースの予約をする
    </v-ons-button>

    <monthly-weather />
  </div>
</template>

<script>
// components
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
</style>
