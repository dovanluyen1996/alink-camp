<template>
  <v-ons-row class="table-header">
    <v-ons-col class="table-title">
      {{ title }}
    </v-ons-col>
    <v-ons-col class="table-update">
      <div>（地点 : {{ pointName || '--' }}）</div>
      <div>{{ updatedAt ? `${$helpers.toShortWithTimeString(updatedAt)}発表` : '--' }}</div>
    </v-ons-col>
  </v-ons-row>
</template>

<script>
export default {
  name: 'CampsitesForecastTableHeader',
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

.table-header {
  height: 40px;
  margin: 15px 0;
  background: $color-th;
  border: 1px solid $color-border;
}

.table-title {
  align-self: center;
  width: 100%;
  padding-left: 10px;
  font-weight: 600;
}

.table-update {
  align-self: flex-end;
  padding-right: 7px;
  padding-bottom: 3px;
  font-size: $font-size-small;
  text-align: right;
}
</style>
