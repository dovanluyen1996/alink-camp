<template>
  <v-ons-row class="course-weather-sun">
    <v-ons-col>
      <img
        src="@/assets/images/weathers/sunrise.svg"
        width="12px"
      >
      {{ sunrise || '--:--' }}
    </v-ons-col>
    <v-ons-col>
      &nbsp;
      <img
        src="@/assets/images/weathers/sunset.svg"
        width="12px"
      >
      {{ sunset || '--:--' }}
    </v-ons-col>
  </v-ons-row>
</template>

<script>
export default {
  name: 'CourseWeatherSun',
  props: {
    sunrise: {
      type: String,
      required: true,
    },
    sunset: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.course-weather-sun {
  flex-wrap: nowrap;
  padding: 5px 6px 0;
  margin-top: 5px;
  font-size: $font-size-small;
  white-space: nowrap;
  border-top: 1px solid $color-border;
}
</style>
