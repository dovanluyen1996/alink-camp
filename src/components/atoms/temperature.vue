<template>
  <div class="temperature">
    <span
      class="temperature__value"
      :style="{ fontSize }"
    >
      {{ displayValue }}
    </span>
    <span class="temperature__unit">
      ℃
    </span>
  </div>
</template>

<script>
export default {
  name: 'TemperatureComponent',
  props: {
    value: {
      type: Number,
      default: null,
      require: true,
    },
    fontSize: {
      type: String,
      default: '14px',
    },
  },
  computed: {
    displayValue() {
      return this.value || '--';
    },
  },
};
</script>

<style scoped lang="scss">
.temperature {
  display: inline-block;

  &__value {
    display: inline-block;
    width: 1.5em;
    font-size: 11px;
    text-align: right;
  }

  &__unit {
    width: 1em;
    font-size: 9px;
  }
}
</style>
