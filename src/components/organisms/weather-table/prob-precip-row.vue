<template>
  <tr>
    <th
      scope="row"
      :class="{th : colorTh}"
    >
      <span v-if="isShowTenDays">
        降水<br>確率
      </span>
      <span v-else>
        降水確率
      </span>
    </th>
    <template v-for="(probPrecip, index) in probPrecips">
      <td :key="index">
        {{ probPrecip ? `${probPrecip}%` : '--' }}
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
    isShowTenDays: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
