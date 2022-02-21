<template>
  <tr>
    <th
      scope="row"
      class="th"
    >
      紫外線
    </th>
    <template v-for="(uv, index) in uvs">
      <td
        :key="index"
      >
        <div
          class="uv-row"
        >
          <img :src="image(uv)">
        </div>
      </td>
    </template>
  </tr>
</template>

<script>
export default {
  name: 'ForecastTableUvRow',
  props: {
    uvs: {
      type: Array,
      required: true,
    },
  },
  methods: {
    image(uv) {
      if (!uv) return this.$helpers.getImage('weathers/uv/uv_large_none.png');

      const image = this.$helpers.getImage(`weathers/uv/uv_large_${uv}.png`);
      return image || this.$helpers.getImage('weathers/uv/uv_large_none.png');
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.uv-row {
  font-size: $font-size-small;
  text-align: center;
  white-space: nowrap;

  img {
    width: 30px;
  }
}
</style>
