<template>
  <v-ons-page
    @show="show"
    @hide="hide"
  >
    <custom-toolbar title="風予測" />

    <div class="content">
      <div class="wind-forecast-content">
        <compass
          ref="compass"
          :forecast-wind="forecastWind"
          :compass-error-visible.sync="compassErrorVisible"
        />
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

    <!-- TODO: change error message - issue#513  -->
    <error-dialog
      title="エラー"
      :is-visible="compassErrorVisible"
      error-message="エラー"
      @close="closeCompassErrorDialog"
    />
  </v-ons-page>
</template>

<script>
import Compass from '@/components/organisms/wind-forecast/compass';
import ErrorDialog from '@/components/organisms/error-dialog';

export default {
  name: 'WindForecastShow',
  components: {
    Compass,
    ErrorDialog,
  },
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      forecastWind: {},
      compassErrorVisible: false,
    };
  },
  beforeDestroy() {
    this.$refs.compass.stopWatch();
    document.removeEventListener('resume', this.onResume, false);
  },
  mounted() {
    document.addEventListener('resume', this.onResume, false);
  },
  methods: {
    getForecastWind() {
      const params = {
        course_id: this.course.id,
        target_date: this.$moment().format('YYYY-MM-DD'),
      };
      return this.$store.dispatch('models/weather/getForecastWind', params);
    },
    goBackToCourseList() {
      this.$store.commit('windForecastNavigator/pop');
    },
    async show() {
      this.forecastWind = await this.getForecastWind();
      this.$refs.compass.startWatch();
    },
    hide() {
      this.$refs.compass.stopWatch();
    },
    closeCompassErrorDialog() {
      this.compassErrorVisible = false;
    },
    async onResume() {
      this.forecastWind = await this.getForecastWind();
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
