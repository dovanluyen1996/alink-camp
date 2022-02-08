<template>
  <tr>
    <th
      scope="row"
      class="th"
    >
      服装
    </th>
    <template v-for="(_clothe, index) in clothes">
      <td
        :key="index"
      >
        <div
          class="clothes-row"
        >
          <img src="@/assets/images/clothes.png">
        </div>
      </td>
    </template>
  </tr>
</template>

<script>
export default {
  name: 'ForecastTableClothesRow',
  props: {
    clothes: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.clothes-row {
  font-size: $font-size-small;
  text-align: center;
  white-space: nowrap;

  img {
    width: 30px;
  }
}
</style>
