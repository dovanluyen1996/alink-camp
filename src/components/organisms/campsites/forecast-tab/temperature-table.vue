<template>
  <div class="temperature-table-container">
    <table-header
      title="月毎の気温予測詳細"
      :point-name="pointName"
    />
    <template v-if="$helpers.isPresentObject(temperatureData)">
      <custom-select
        v-model="selectedMonth"
        :options="optionMonths.map(month => ({ value: month, text: `${parseInt(month, 10)}月` }))"
      />
      <table class="temperature-table">
        <tr>
          <th></th>
          <th>最高気温</th>
          <th>最低気温</th>
        </tr>
        <template v-for="(temperature, index) in monthlyTemperature()">
          <tr :key="index">
            <td>{{ temperature.period }}</td>
            <td>{{ temperature.maxTemp }}℃</td>
            <td>{{ temperature.miniTemp }}℃</td>
          </tr>
        </template>
      </table>
    </template>

    <template v-else>
      <div class="no-forecast">
        表示できる天気情報がありません
      </div>
    </template>
  </div>
</template>

<script>
import moment from 'moment';

import TableHeader from '@/components/organisms/campsites/forecast-tab/forecast-header';
import CustomSelect from '@/components/atoms/form/custom-select';

export default {
  name: 'CampsitesForecastTemperatureTable',
  components: {
    TableHeader,
    CustomSelect,
  },
  data() {
    return {
      temperatureData: {},
      optionMonths: [],
      selectedMonth: '',
      pointName: '',
    };
  },
  computed: {
    campsite() {
      return this.$store.getters['campsite/choosenCampsite'];
    },
  },
  watch: {
    async campsite() {
      const forecastYearlyTemp = await this.getForecastYearlyTemp();
      if (forecastYearlyTemp) {
        const convertData = forecastYearlyTemp.items.map(item => [item.month, item.periodData]);
        this.temperatureData = Object.fromEntries(convertData);
        this.optionMonths = forecastYearlyTemp.items.map(item => item.month);
        this.selectedMonth = moment().format('M').padStart(2, '0');
        this.pointName = forecastYearlyTemp.pointName;
      }
    },
  },
  methods: {
    monthlyTemperature() {
      return this.temperatureData[this.selectedMonth];
    },
    async getForecastYearlyTemp() {
      if (!this.campsite.id) return null;

      const forecastYearlyTemp = await this.$store.dispatch('models/weather/getForecastYearlyTemp', { campsite_id: this.campsite.id });
      return forecastYearlyTemp;
    },
  },
};
</script>

<style scoped lang="scss">
/deep/ {
  .select-input {
    border: 1px solid #d9d9d9;
  }

  .select {
    width: 100%;
  }

  option {
    text-align: center;
  }
}

.temperature-table {
  width: 100%;
  margin-top: 10px;
  margin-bottom: 14px;

  th,
  td {
    font-size: 14px;
    font-weight: bold;
    text-align: center;
  }
}

.no-forecast {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
}
</style>
