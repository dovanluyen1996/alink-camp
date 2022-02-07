<template>
  <tr>
    <th
      scope="row"
      class="th"
    >
      落雷
    </th>
    <template v-for="(_lightning, index) in lightnings">
      <td
        :key="index"
      >
        <div
          class="lightning-row"
        >
          <img src="@/assets/images/lightning.png">
        </div>
      </td>
    </template>
  </tr>
</template>

<script>
export default {
  name: 'ForecastTableLightningRow',
  props: {
    lightnings: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.lightning-row {
  font-size: $font-size-small;
  text-align: center;
  white-space: nowrap;

  img {
    width: 30px;
  }
}
</style>
