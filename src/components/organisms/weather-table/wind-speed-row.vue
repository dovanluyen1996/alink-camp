<template>
  <tr>
    <th
      scope="row"
      :class="{th : colorTh}"
    >
      風速 (km)
    </th>
    <template v-for="(windSpeed, index) in windSpeeds">
      <td :key="index">
        {{ windSpeed }}
      </td>
    </template>
  </tr>
</template>

<script>

export default {
  name: 'ForecastTableWindSpeedRow',
  props: {
    windSpeeds: {
      type: Array,
      default: () => [],
      required: true,
    },
    colorTh: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
