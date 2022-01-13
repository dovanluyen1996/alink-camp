<template>
  <div class="campsite-weather-the-day-before">
    <div class="campsite-weather-the-day-before-title">
      <span>予定日前日</span><span>の天気</span>
    </div>
    <weather-image
      :weather="forecast"
      :is-shown-name="true"
      image-width="66px"
    />
    <campsite-weather-temperatures
      :forecast="forecast"
    />
  </div>
</template>

<script>
// components
import WeatherImage from '@/components/atoms/weather-image';
import CampsiteWeatherTemperatures from '@/components/organisms/campsite-weather/temperatures';

export default {
  name: 'CampsiteWeatherTheDayBefore',
  components: {
    WeatherImage,
    CampsiteWeatherTemperatures,
  },
  props: {
    forecast: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_mixins.scss';
@import '@/assets/scss/_variables.scss';

.campsite-weather-the-day-before {
  box-sizing: border-box;
  display: grid;
  padding: 8px 10px 10px;
  text-align: center;
  border: 1px solid #d9d9d9;
}

.campsite-weather-the-day-before-title {
  @include title-style;

  margin-bottom: 10px;
  font-size: $font-size-small;

  span {
    display: inline-block;
  }
}

.weather {
  margin-bottom: 10px;
}

.campsite-weather-temperatures {
  align-self: flex-end;
}
</style>
