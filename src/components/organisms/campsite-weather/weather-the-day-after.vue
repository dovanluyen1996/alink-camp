<template>
  <div>
    <div>
      {{ forecast.date | moment('MM/DD') }}
      <span>のお天気</span>
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
  name: 'CampsiteWeatherTheDayAfter',
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
