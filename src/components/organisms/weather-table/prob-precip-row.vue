<template>
  <tr>
    <th
      scope="row"
      :class="{th : colorTh}"
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
    probPrecips: {
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
