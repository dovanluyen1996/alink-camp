<template>
  <div class="dress">
    <div class="dress-title">
      服装
    </div>
    <img
      :src="image"
      width="26px"
    >
    <div class="dress-label">
      {{ label }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseWeatherDressIndex',
  props: {
    forecast: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      dress_text: {
        fine_1: '着脱可能な服',
        fine_2: '上着が重宝',
        fine_3: 'しっかり保温',
        fine_4: '厳重に防寒を',
        fine_5: '冬山の装備を',
        rain_1: '急な雨に備えて',
        rain_2: '急な雨に備えて',
        rain_3: '急な雨に備えて',
        rain_4: '雨具の下は暖かく',
        rain_5: '冬山の装備を',
      },
    };
  },
  computed: {
    image() {
      return this.$helpers.getImage(`weathers/dress/dress_large_${this.getImageFileName()}.png`);
    },
    label() {
      return this.dress_text[`${this.forecast.dress_index_weather}_${this.forecast.dress_index}`];
    },
  },
  methods: {
    getImageFileName() {
      const isNone = !this.forecast.dress_index || !this.forecast.dress_index_weather;
      const imageName = `${this.forecast.dress_index_weather}_${this.forecast.dress_index}`;

      return isNone ? 'none' : imageName;
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_mixins.scss';
@import '@/assets/scss/_variables.scss';

.dress-title {
  @include title-style;

  font-size: $font-size-small;
}

.dress-label {
  font-size: $font-size-small;
}
</style>
