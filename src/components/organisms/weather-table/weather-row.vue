<template>
  <tr>
    <th
      scope="row"
      class="th"
    >
      天気
    </th>
    <template v-for="(weather, index) in weathers">
      <td
        v-if="weather"
        :key="index"
      >
        <weather-image
          :weather="weather"
          image-width="40px"
        />
      </td>

      <td
        v-else-if="weather.isSunrise"
        :key="index"
        :rowspan="sunsRowspan"
      >
        <div
          class="weather-row-sunrise"
        >
          <img src="@/assets/images/weathers/sunrise.png">
          <div>日の出</div>
        </div>
      </td>

      <td
        v-else-if="weather.isSunset"
        :key="index"
        :rowspan="sunsRowspan"
      >
        <div
          class="weather-row-sunset"
        >
          <img src="@/assets/images/weathers/sunset.png">
          <div>日の入</div>
        </div>
      </td>
    </template>
  </tr>
</template>

<script>
import WeatherImage from '@/components/atoms/weather-image';

export default {
  name: 'ForecastTableWeatherRow',
  components: {
    WeatherImage,
  },
  props: {
    weathers: {
      type: Array,
      default: () => [],
      required: true,
    },
    sunsRowspan: {
      type: Number,
      default: 5,
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.weather-row-sunrise,
.weather-row-sunset {
  font-size: $font-size-small;
  text-align: center;
  white-space: nowrap;

  img {
    width: 30px;
  }
}
</style>
