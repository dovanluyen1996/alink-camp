<template>
  <tr>
    <th
      scope="row"
      :class="{th : colorTh}"
    >
      <span v-if="displayTenDaysWeather">
        降水<br>確率
      </span>
      <span v-else>
        降水確率
      </span>
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
    displayTenDaysWeather: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
