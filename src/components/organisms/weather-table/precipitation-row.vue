<template>
  <tr>
    <th
      scope="row"
      class="th"
    >
      降水量<br>(mm/h)
    </th>
    <template v-for="(precipitation, index) in precipitations">
      <td :key="index">
        {{ precipitationText(precipitation) || '--' }}
      </td>
    </template>
  </tr>
</template>

<script>

export default {
  name: 'ForecastTablePrecipitationRow',
  props: {
    forecastData: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  computed: {
    precipitations() {
      return this.forecastData.map(data => data.precip);
    },
  },
  methods: {
    precipitationText(precipitation) {
      return this.$helpers.isEmpty(precipitation) ? '--' : precipitation;
    },
  },
};
</script>
