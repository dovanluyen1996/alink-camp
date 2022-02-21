<template>
  <tr>
    <th
      scope="row"
      class="th"
    >
      星空
    </th>
    <template v-for="(star, index) in stars">
      <td
        :key="index"
      >
        <div
          class="star-row"
        >
          <img :src="image(star)">
        </div>
      </td>
    </template>
  </tr>
</template>

<script>
export default {
  name: 'ForecastTableStarRow',
  props: {
    stars: {
      type: Array,
      required: true,
    },
  },
  methods: {
    image(star) {
      if (!star) return this.$helpers.getImage('weathers/star/00.png');

      const image = this.$helpers.getImage(`weathers/star/${star}`);
      return image || this.$helpers.getImage('weathers/star/00.png');
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.star-row {
  font-size: $font-size-small;
  text-align: center;
  white-space: nowrap;

  img {
    width: 30px;
  }
}
</style>
