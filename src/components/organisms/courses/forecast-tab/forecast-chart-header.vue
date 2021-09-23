<template>
  <v-ons-row class="chart-header">
    <v-ons-col
      class="chart-title"
      width="110px"
    >
      {{ title }}
    </v-ons-col>
    <v-ons-col class="chart-update">
      <div>（地点 : {{ pointName || '--' }}）</div>
      <div>{{ updateAt ? `${$helpers.toShortWithTimeString(updatedAt)}発表` : '--' }}</div>
    </v-ons-col>
  </v-ons-row>
</template>

<script>
export default {
  name: 'CoursesForecastChartHeader',
  props: {
    title: {
      type: String,
      default: '',
    },
    updatedAt: {
      type: String,
      default: '',
    },
    pointName: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.chart-header {
  height: 40px;
  margin: 15px 0;
  background: $color-th;
  border: 1px solid $color-border;
}

.chart-title {
  align-self: center;
  padding-left: 10px;
  font-weight: 600;
}

.chart-update {
  align-self: flex-end;
  padding-right: 7px;
  padding-bottom: 3px;
  font-size: $font-size-small;
  text-align: right;
}
</style>
