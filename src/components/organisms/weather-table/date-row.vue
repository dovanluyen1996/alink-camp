<template>
  <tr class="date-row">
    <th
      scope="row"
      class="th"
    >
      日
    </th>
    <template v-for="(date, index) in dates">
      <!-- eslint-disable vue/no-v-html -->
      <td
        :key="index"
        :date-day="date"
        v-html="displayDate(date)"
      >
      <!-- eslint-enable vue/no-v-html -->
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
      return this.$helpers.toWeekDayString(date);
    },
  },
};
</script>
