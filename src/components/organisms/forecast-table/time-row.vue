<template>
  <tr class="time-row">
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
        {{ displayTime(time) }}
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
  methods: {
    displayTime(time) {
      console.log(time);
      // TODO: timeを元に整形してください
      return '01';
    },
  },
};
</script>

<style scoped lang="scss">
.time-row {
  td {
    font-weight: 600;
  }
}
</style>
