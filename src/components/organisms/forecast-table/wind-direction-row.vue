<template>
  <tr>
    <th
      scope="row"
      class="th"
    >
      風の向き
    </th>
    <template v-for="(windDirection, index) in windDirections">
      <td :key="index">
        {{ windDirection }}
      </td>
    </template>
  </tr>
</template>

<script>

export default {
  name: 'ForecastTableWindDirectionRow',
  props: {
    forecastData: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  computed: {
    windDirections() {
      return this.forecastData.map(data => data.wind_direction);
    },
  },
};
</script>
