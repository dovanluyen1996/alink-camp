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
        {{ timeLabel(time, index) }}
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
      return this.forecastData.map(data => data.hour);
    },
  },
  methods: {
    timeLabel(time, index) {
      if (time) return time;

      if (this.forecastData[index].isSunrise || this.forecastData[index].isSunset) return '--:--';

      return '--';
    },
  },
};
</script>
