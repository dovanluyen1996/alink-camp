<template>
  <div class="campsites-forecast-tab">
    <div class="wrapper-table">
      <transition name="fade">
        <hourly-weather v-if="isShownHourly">
          <template #switcher>
            <forecast-switcher :segment-index.sync="segmentIndex" />
          </template>
        </hourly-weather>

        <fourteen-days-weather v-if="isShownFourteenDays">
          <template #switcher>
            <forecast-switcher :segment-index.sync="segmentIndex" />
          </template>
        </fourteen-days-weather>
      </transition>

      <div class="ml-mr-30">
        <a
          v-if="reservationUrl()"
          class="reservation-button button button--large--cta button--rounded button--custom"
          @click="openReservationPage()"
        >
          <img src="@/assets/images/booking.png">
          キャンプ場のホームページへ
        </a>
      </div>
    </div>

    <monthly-weather />
  </div>
</template>

<script>
// components
import ForecastSwitcher from '@/components/organisms/campsites/forecast-tab/forecast-switcher';
import HourlyWeather from '@/components/organisms/campsites/forecast-tab/hourly-weather';
import FourteenDaysWeather from '@/components/organisms/campsites/forecast-tab/fourteen-days-weather';
import MonthlyWeather from '@/components/organisms/campsites/forecast-tab/monthly-weather';

const segmentIndexes = {
  hourly: 0,
  fourteenDays: 1,
};

export default {
  name: 'CampsiteForecastTab',
  components: {
    ForecastSwitcher,
    HourlyWeather,
    FourteenDaysWeather,
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
    isShownFourteenDays() {
      return this.segmentIndex === segmentIndexes.fourteenDays;
    },
    campsites() {
      // handle choosen campsite
    },
  },
  methods: {
    reservationUrl() {
      // TODO: handle reservation Url

      return 'https://google.com';
    },
    openReservationPage() {
      this.$helpers.openPageByUrl(this.reservationUrl());
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.campsites-forecast-tab {
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

.wrapper-table {
  width: 100%;
  padding: 10px 0 30px;
  margin-bottom: 30px;
  background: #fff;
}

.ml-mr-30 {
  margin: 0 30px;
}

.button {
  &--custom {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $color-yellow;

    img {
      margin-right: 5px;
    }
  }
}
</style>
