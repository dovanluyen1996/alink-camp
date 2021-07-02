<template>
  <div class="temperature">
    <span
      class="temperature__value"
      :style="{ fontSize }"
    >
      {{ displayValue }}
    </span><span class="temperature__unit">℃</span>
  </div>
</template>

<script>
export default {
  name: 'TemperatureComponent',
  props: {
    value: {
      type: String,
      default: null,
    },
    isInteger: {
      type: Boolean,
      default: false,
      required: true,
    },
    fontSize: {
      type: String,
      default: '14px',
    },
  },
  computed: {
    displayValue() {
      if (!this.value) return '--';

      return this.isInteger ? Math.round(this.value) : this.value;
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.temperature {
  display: inline-block;

  &__value {
    display: inline-block;
    text-align: right;
  }

  &__unit {
    width: 1em;
    margin-left: 3px;

    /* NOTE: フォントサイズの最小は12pxとしているが温度と明らかなため
     *       多少見えづらくても問題ないと判断して9px指定 */
    font-size: 9px;
  }
}
</style>
