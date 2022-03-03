<template>
  <div class="uv">
    <div v-if="isPurchased">
      <div class="uv-title">
        紫外線
      </div>
      <img
        :src="image"
        width="26px"
      >
      <div class="uv-label">
        {{ label }}
      </div>
    </div>
    <div v-else>
      <div class="uv-title uv-title--unpaid">
        紫外線
      </div>
      <img
        src="@/assets/images/weathers/uv/00.png"
        width="26px"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'CampsiteWeatherUvIndex',
  props: {
    forecast: {
      type: Object,
      required: true,
    },
    isPurchased: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      uv_text: {
        1: '弱い',
        2: 'やや強い',
        3: '強い',
        4: '非常に強い',
        5: 'きわめて強い',
      },
    };
  },
  computed: {
    image() {
      if (!this.forecast) return this.$helpers.getImage('weathers/uv/uv_large_none.png');

      const image = this.$helpers.getImage(`weathers/uv/uv_large_${this.forecast.uvIndex}.png`);
      return image || this.$helpers.getImage('weathers/uv/uv_large_none.png');
    },
    label() {
      if (!this.forecast) return '';

      return this.forecast.uvIndex ? this.uv_text[this.forecast.uvIndex] : '';
    },
  },
};
</script>
