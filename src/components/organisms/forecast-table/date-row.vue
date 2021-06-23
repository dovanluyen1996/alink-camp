<template>
  <tr>
    <th
      scope="row"
      class="th"
    >
      日
    </th>
    <template v-for="(date, index) in dates">
      <td
        :key="index"
        :date-day="date"
        v-html="displayDate(date)"
      >
      </td>
    </template>
  </tr>
</template>

<script>

export default {
  name: 'ForecastTableDateRow',
  props: {
    forecastData: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  computed: {
    dates() {
      return this.forecastData.map(data => data.date);
    },
  },
  methods: {
    displayDate(date) {
      // TODO: dateを元に成形してください
      console.log(date);
      return '7日<br>（木）';
    },
  },
};
</script>
