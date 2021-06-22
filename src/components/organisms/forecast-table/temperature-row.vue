<template>
  <tr :class="trClass">
    <th
      scope="row"
      class="th"
    >
      {{ thText }}
    </th>
    <template v-for="(temperature, index) in temperatures">
      <td :key="index">
        {{ temperature }} ℃
      </td>
    </template>
  </tr>
</template>

<script>

export default {
  name: 'ForecastTableTemperatureRow',
  props: {
    forecastData: {
      type: Array,
      default: () => [],
      required: true,
    },
    isHighest: {
      type: Boolean,
      default: false,
    },
    isLowest: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    trClass() {
      if (this.isHighest) return 'is-highest';
      if (this.isLowest) return 'is-lowest';
      return null;
    },
    thText() {
      if (this.isHighest) return '最高';
      if (this.isLowest) return '最低';
      return '気温';
    },
    temperatures() {
      // TODO: 最高・最低の判別をしてください
      return this.forecastData.map(data => data.temperature);
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@/assets/scss/_variables.scss';

.is-highest {
  td {
    color: $color-temperature-high;
  }
}

.is-lowest {
  td {
    color: $color-temperature-low;
  }
}
</style>
