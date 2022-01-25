<template>
  <tr>
    <th
      scope="row"
      :class="{th : colorTh}"
    >
      湿度 (%)
    </th>
    <template v-for="(humidity, index) in humidities">
      <td :key="index">
        {{ humidity || '--' }}
      </td>
    </template>
  </tr>
</template>

<script>

export default {
  name: 'HumidityRow',
  props: {
    humidities: {
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
