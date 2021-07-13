<template>
  <v-ons-page>
    <custom-toolbar title="風予測" />

    <div class="content">
      <div class="wind-forecast-content">
        <compass :course="course" />
        <div class="course-info">
          {{ course.name }}<br>
          {{ course.address }}
        </div>
        <v-ons-button
          modifier="cta"
          @click="goBackToCourseList"
        >
          表示したいコースを選択
        </v-ons-button>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
import Compass from '@/components/organisms/wind-forecast/compass';

export default {
  name: 'WindForecastShow',
  components: {
    Compass,
  },
  props: {
    course: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  methods: {
    goBackToCourseList() {
      this.$store.commit('windForecastNavigator/pop');
    },
  },
};
</script>

<style lang="scss" scoped>
.wind-forecast-content {
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 5px 0;
}

.course-info {
  margin-bottom: 30px;
  font-weight: 300;
  text-align: center;
}
</style>
