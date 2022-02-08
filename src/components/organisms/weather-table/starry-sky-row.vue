<template>
  <tr>
    <th
      scope="row"
      class="th"
    >
      星空
    </th>
    <template v-for="(_starrySky, index) in starrySkies">
      <td
        :key="index"
      >
        <div
          class="starry-sky-row"
        >
          <img src="@/assets/images/starry-sky.png">
        </div>
      </td>
    </template>
  </tr>
</template>

<script>
export default {
  name: 'ForecastTableStarrySkyRow',
  props: {
    starrySkies: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.starry-sky-row {
  font-size: $font-size-small;
  text-align: center;
  white-space: nowrap;

  img {
    width: 30px;
  }
}
</style>
