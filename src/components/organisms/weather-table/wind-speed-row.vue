<template>
  <tr>
    <th
      scope="row"
      :class="{th : colorTh}"
    >
      風速
    </th>
    <template v-for="(windSpeed, index) in windSpeeds">
      <td :key="index">
        <!-- TODO: 単位は天気APIと合わせてください -->
        {{ windSpeed }} m/h
      </td>
    </template>
  </tr>
</template>

<script>

export default {
  name: 'ForecastTableWindSpeedRow',
  props: {
    forecastData: {
      type: Array,
      default: () => [],
      required: true,
    },
    colorTh: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    windSpeeds() {
      return this.forecastData.map(data => data.wind_speed);
    },
  },
};
</script>
