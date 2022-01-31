<template>
  <tr>
    <th
      scope="row"
      class="th"
    >
      服装
    </th>
    <template v-for="(dress, index) in dresses">
      <td
        :key="index"
      >
        <div
          class="dress-row"
        >
          <img :src="image(dress)">
        </div>
      </td>
    </template>
  </tr>
</template>

<script>
export default {
  name: 'ForecastTableDressRow',
  props: {
    dresses: {
      type: Array,
      required: true,
    },
  },
  methods: {
    image(dress) {
      if (!dress) return this.$helpers.getImage('weathers/dress/00.png');

      const image = this.$helpers.getImage(`weathers/dress/${dress}`);
      return image || this.$helpers.getImage('weathers/dress/00.png');
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.dress-row {
  font-size: $font-size-small;
  text-align: center;
  white-space: nowrap;

  img {
    width: 30px;
  }
}
</style>
