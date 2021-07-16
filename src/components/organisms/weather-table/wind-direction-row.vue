<template>
  <tr>
    <th
      scope="row"
      :class="{th : colorTh}"
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
    windDirections: {
      type: Array,
      required: true,
    },
    colorTh: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
