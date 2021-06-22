<template>
  <tr>
    <th
      scope="row"
      class="th"
    >
      降水確率
    </th>
    <template v-for="(probPrecip, index) in probPrecips">
      <td :key="index">
        {{ probPrecip }} %
      </td>
    </template>
  </tr>
</template>

<script>

export default {
  name: 'ForecastTableWindProbPrecipsRow',
  props: {
    forecastData: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  computed: {
    probPrecips() {
      return this.forecastData.map(data => data.prob_precip);
    },
  },
};
</script>
