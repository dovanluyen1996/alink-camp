<template>
  <tr>
    <th
      scope="row"
      :class="{th : colorTh}"
    >
      <span v-if="isShowHourly">
        湿度
      </span>
      <span v-else>
        湿度 (%)
      </span>
    </th>
    <template v-for="(humidity, index) in humidities">
      <td
        v-if="isShowHourly"
        :key="index"
      >
        {{ humidity ? `${humidity}%` : '--' }}
      </td>

      <td
        v-else
        :key="index"
      >
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
    isShowHourly: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
