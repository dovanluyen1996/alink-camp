<template>
  <div class="thunder">
    <div v-if="isPurchased">
      <div class="thunder-title">
        落雷
      </div>
      <img
        :src="image"
        width="26px"
      >
      <div class="thunder-label">
        {{ label }}
      </div>
    </div>
    <div v-else>
      <div class="thunder-title thunder-title--unpaid">
        落雷
      </div>
      <img
        src="@/assets/images/weathers/thunder/thunder_large_none.png"
        width="26px"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'CampsiteWeatherThunderIndex',
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
      thunder_text: {
        1: '低い',
        2: 'やや低い',
        3: 'やや高い',
        4: '高い',
      },
    };
  },
  computed: {
    image() {
      if (!this.forecast) return this.$helpers.getImage('weathers/thunder/thunder_large_none.png');

      const image = this.$helpers.getImage(`weathers/thunder/thunder_large_${this.forecast.thunderIndex}.png`);
      return image || this.$helpers.getImage('weathers/thunder/thunder_large_none.png');
    },
    label() {
      if (!this.forecast) return '';

      return this.forecast.thunderIndex ? this.thunder_text[this.forecast.thunderIndex] : '';
    },
  },
};
</script>
