<template>
  <div class="weather-the-day-after">
    <div class="weather-the-day-after-title">
      {{ forecast.date | moment('MM/DD') }}
    </div>
    <weather-image
      :weather="forecast"
      :is-shown-name="true"
      image-width="38.5px"
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

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.weather-the-day-after {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 30px;
  margin: 8px auto;
  background-color: #fff;
}

.weather-the-day-after-title {
  padding: 0 5px 0 10px;
  font-size: 10px;
  font-weight: 600;
}

.campsite-weather-temperatures {
  padding: 0 10px 0 5px;
}

/deep/ {
  .weather {
    display: flex;
    align-items: center;
  }

  .weather-image {
    width: 38.5px;
    height: 24px;
  }

  .weather-name {
    font-size: 10px;
    font-weight: 300;
  }

  .temperature-label,
  .temperature__value,
  .temperature__unit {
    font-weight: 300;
  }

  .temperature__unit {
    margin-left: 0;
  }

  .campsite-weather-temperatures {
    align-items: center;
  }

  .campsite-weather-box {
    display: flex;
    gap: 5px;
    align-items: center;
    height: 100%;
  }

  .temperature-high {
    margin-right: 5px;
  }
}
</style>
