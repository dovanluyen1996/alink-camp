<template>
  <v-ons-row class="course-weather-sun">
    <v-ons-col>
      <img
        src="@/assets/images/weathers/sunrise.png"
        width="12px"
      >
      {{ sunrise }}
    </v-ons-col>
    <v-ons-col>
      &nbsp;
      <img
        src="@/assets/images/weathers/sunset.png"
        width="12px"
      >
      {{ sunset }}
    </v-ons-col>
  </v-ons-row>
</template>

<script>
export default {
  name: 'CourseWeatherTemperatures',
  props: {
    sunrise: {
      type: String,
      default: null,
    },
    sunset: {
      type: String,
      default: null,
    },
  },
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.course-weather-sun {
  flex-wrap: nowrap;
  padding-top: 5px;
  margin-top: 5px;
  font-size: $font-size-small;
  white-space: nowrap;
  border-top: 1px solid $color-border;
}
</style>
