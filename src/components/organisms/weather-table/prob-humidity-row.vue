<template>
  <tr>
    <th
      scope="row"
      :class="{th : colorTh}"
    >
      <span v-if="isShowFourteenDays">
        湿度
      </span>
      <span v-else>
        湿度
      </span>
    </th>
    <template v-for="(probHumidity, index) in probHumidities">
      <td :key="index">
        {{ probHumidity ? `${probHumidity}%` : '--' }}
      </td>
    </template>
  </tr>
</template>

<script>

export default {
  name: 'ForecastTableWindProbHumiditiesRow',
  props: {
    probHumidities: {
      type: Array,
      required: true,
    },
    colorTh: {
      type: Boolean,
      default: true,
    },
    isShowFourteenDays: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
