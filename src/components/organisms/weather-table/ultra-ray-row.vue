<template>
  <tr>
    <th
      scope="row"
      class="th"
    >
      紫外線
    </th>
    <template v-for="(_ultraRay, index) in ultraRays">
      <td
        :key="index"
      >
        <div
          class="ultra-ray-row"
        >
          <img src="@/assets/images/ultra-ray.png">
        </div>
      </td>
    </template>
  </tr>
</template>

<script>
export default {
  name: 'ForecastTableUltraRayRow',
  props: {
    ultraRays: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.ultra-ray-row {
  font-size: $font-size-small;
  text-align: center;
  white-space: nowrap;

  img {
    width: 30px;
  }
}
</style>
