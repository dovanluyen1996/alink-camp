<template>
  <tr>
    <th
      scope="row"
      class="th"
    >
      落雷
    </th>
    <template v-for="(thunder, index) in thunders">
      <td
        :key="index"
      >
        <div
          class="thunder-row"
        >
          <img :src="image(thunder)">
        </div>
      </td>
    </template>
  </tr>
</template>

<script>
export default {
  name: 'ForecastTableThunderRow',
  props: {
    thunders: {
      type: Array,
      required: true,
    },
  },
  methods: {
    image(thunder) {
      if (!thunder) return this.$helpers.getImage('weathers/thunder/thunder_large_none.png');

      const image = this.$helpers.getImage(`weathers/thunder/thunder_large_${thunder}.png`);
      return image || this.$helpers.getImage('weathers/thunder/thunder_large_none.png');
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.thunder-row {
  font-size: $font-size-small;
  text-align: center;
  white-space: nowrap;

  img {
    width: 30px;
  }
}
</style>
