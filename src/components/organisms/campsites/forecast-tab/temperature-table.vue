<template>
  <div class="temperature-table-container">
    <table-header
      title="月毎の気温予測詳細"
    />
    <!-- TODO: Handle v-if if data present -->
    <template v-if="true">
      <custom-select
        v-model="selectedMonth"
        :options="optionMonths.map(month => ({ value: month, text: month }))"
      />
      <table class="temperature-table">
        <tr>
          <th></th>
          <th>最高気温</th>
          <th>最低気温</th>
        </tr>
        <tr>
          <td>上旬</td>
          <td>99.9℃</td>
          <td>99.9℃</td>
        </tr>
        <tr>
          <td>中旬</td>
          <td>99.9℃</td>
          <td>99.9℃</td>
        </tr>
        <tr>
          <td>下旬</td>
          <td>99.9℃</td>
          <td>99.9℃</td>
        </tr>
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
import TableHeader from '@/components/organisms/campsites/forecast-tab/forecast-table-header';
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
      optionMonths: ['1月', '2月', '3月', '4月'],
      selectedMonth: '',
    };
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

  th,
  td {
    font-size: 14px;
    font-weight: 600;
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
