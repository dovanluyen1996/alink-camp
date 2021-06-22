<template>
  <tr>
    <th
      scope="row"
      class="th"
    >
      時
    </th>
    <template v-for="(time, index) in times">
      <td
        :key="index"
        :date-time="time"
      >
        {{ time }}
      </td>
    </template>
  </tr>
</template>

<script>

export default {
  name: 'ForecastTableTimeRow',
  props: {
    forecastData: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  computed: {
    times() {
      return this.forecastData.map(data => data.time);
    },
  },
};
</script>
