<template>
  <tr :class="['temperature-row', trClass]">
    <th
      scope="row"
      class="th"
    >
      {{ thText }}
    </th>
    <template v-for="(temperature, index) in temperatures">
      <td :key="index">
        <temperature-component
          :value="temperature"
          font-size="12px"
        />
      </td>
    </template>
  </tr>
</template>

<script>
// components
import TemperatureComponent from '@/components/atoms/temperature';

export default {
  name: 'ForecastTableTemperatureRow',
  components: {
    TemperatureComponent,
  },
  props: {
    forecastData: {
      type: Array,
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
      let temperatures;

      if (this.isHighest) {
        temperatures = this.forecastData.map(data => (data ? data.maxTemp : null));
      } else {
        temperatures = this.forecastData.map(data => (data ? data.minTemp : null));
      }

      return temperatures;
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.temperature-row {
  td {
    font-weight: 600;
  }
}

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
