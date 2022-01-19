<template>
  <div class="annual-weather-container">
    <table-header
      title="年間の天気傾向"
    />
    <!-- TODO: Handle v-if if data present -->
    <template v-if="true">
      <!-- TODO: show chart when implement Logic. Delete annual-weather-chart.png image -->
      <img
        class="image-temp"
        src="@/assets/images/annual-weather-chart.png"
      >
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

export default {
  name: 'CampsitesForecastAnnualWeatherChart',
  components: {
    TableHeader,
  },
};
</script>

<style scoped lang="scss">
.image-temp {
  width: 100%;
}

.no-forecast {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
}
</style>
