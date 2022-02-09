<template>
  <v-ons-row class="campsite-weather-sun">
    <v-ons-col>
      <div class="campsite-weather-sun__box">
        <div class="campsite-weather-sun__top">
          <span>日の出</span>
          <img
            src="@/assets/images/weathers/sunrise.png"
            width="25px"
          >
        </div>
        <div class="campsite-weather-sun__date-time">
          {{ sunrise || '--:--' }}
        </div>
      </div>
    </v-ons-col>
    <v-ons-col>
      <div class="campsite-weather-sun__box">
        <div class="campsite-weather-sun__top">
          <span>日の入</span>
          <img
            src="@/assets/images/weathers/sunset.png"
            width="25px"
          >
        </div>
        <div class="campsite-weather-sun__date-time">
          {{ sunset || '--:--' }}
        </div>
      </div>
    </v-ons-col>
  </v-ons-row>
</template>

<script>
export default {
  name: 'CampsiteWeatherSun',
  props: {
    sunrise: {
      type: String,
      required: true,
    },
    sunset: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.campsite-weather-sun {
  flex-wrap: nowrap;
  padding-left: 5px;
  font-size: $font-size-small;
  white-space: nowrap;

  &__box {
    display: flex;
    align-items: center;
    margin-right: 5px;
  }

  &__top {
    display: flex;
    flex-direction: column;
    margin-right: 8px;

    & > span {
      font-size: 6px;
      font-weight: 600;
    }
  }

  &__date-time {
    margin-top: 5px;
    font-size: 9px;
    font-weight: 300;
    color: #222;
  }
}
</style>
