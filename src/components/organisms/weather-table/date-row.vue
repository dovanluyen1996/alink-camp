<template>
  <tr class="date-row">
    <th
      scope="row"
      class="th"
    >
      日
    </th>
    <template v-for="(date, index) in dates">
      <template v-if="date">
        <!-- eslint-disable vue/no-v-html -->
        <td
          :key="index"
          :date-day="date"
          :class="[saturdayCol(date), sundayCol(date)]"
          v-html="displayDate(date)"
        >
        <!-- eslint-enable vue/no-v-html -->
        </td>
      </template>
      <template v-else>
        <td :key="index">
          --
        </td>
      </template>
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
      return this.forecastData.map(data => (data ? data.date : null));
    },
  },
  methods: {
    displayDate(date) {
      return this.$helpers.toWeekDayString(date);
    },
    saturdayCol(date) {
      return this.$helpers.isSaturday(date) ? 'date-row__sarturday' : '';
    },
    sundayCol(date) {
      return this.$helpers.isSunday(date) ? 'date-row__sunday' : '';
    },
  },
};
</script>

<style lang="scss" scoped>
.date-row {
  &__sarturday {
    color: #113095;
    background-color: #e3f6ff;
  }

  &__sunday {
    color: #9d1d1d;
    background-color: #ffeaea;
  }
}
</style>
