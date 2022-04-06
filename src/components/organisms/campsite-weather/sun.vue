<template>
  <v-ons-row class="campsite-weather-sun">
    <v-ons-col>
      <div class="campsite-weather-sun__box">
        <div class="campsite-weather-sun__title">
          日の出
        </div>
        <img
          src="@/assets/images/weathers/sunrise.png"
          width="24px"
        >
        <div class="campsite-weather-sun__date-time">
          {{ sunrise || '--:--' }}
        </div>
      </div>
    </v-ons-col>
    <v-ons-col>
      <div class="campsite-weather-sun__box">
        <div class="campsite-weather-sun__title">
          日の入
        </div>
        <img
          src="@/assets/images/weathers/sunset.png"
          width="24px"
        >
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
  max-width: 150px;
  margin: 0 auto;
  font-size: $font-size-small;
  font-weight: bold;
  text-align: center;
  white-space: nowrap;

  &__title {
    color: #007540;
  }
}
</style>
