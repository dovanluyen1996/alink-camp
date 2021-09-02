<template>
  <tr>
    <th
      scope="row"
      :class="{th : colorTh}"
    >
      <span v-if="displayCourseWeatherTop">
        風速 (m/s)
      </span>
      <span v-else>
        風速<br>(m/s)
      </span>
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
      required: true,
    },
    colorTh: {
      type: Boolean,
      default: true,
    },
    displayCourseWeatherTop: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
