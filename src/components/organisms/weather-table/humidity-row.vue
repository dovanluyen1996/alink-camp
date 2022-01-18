<template>
  <tr>
    <th
      scope="row"
      :class="{th : colorTh}"
    >
      湿度 (%)
    </th>
    <template v-for="(value, index) in humidity">
      <td :key="index">
        {{ value || '--' }}
      </td>
    </template>
  </tr>
</template>

<script>

export default {
  name: 'HumidityRow',
  props: {
    humidity: {
      type: Array,
      required: true,
    },
    colorTh: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
