<template>
  <tr>
    <th
      scope="row"
      class="th"
    >
      風速
    </th>
    <template v-for="(windSpeed, index) in windSpeeds">
      <td :key="index">
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
  },
  computed: {
    windSpeeds() {
      return this.forecastData.map(data => data.wind_speed);
    },
  },
};
</script>
