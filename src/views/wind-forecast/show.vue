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

    <v-ons-alert-dialog :visible.sync="compassErrorVisible">
      <template #title>
        エラー
      </template>

      コンパスの実行に失敗しました

      <template #footer>
        <v-ons-button @click="goBackToCourseList()">
          コース選択に戻る
        </v-ons-button>
        <v-ons-button @click="show()">
          再度APIを実行する
        </v-ons-button>
      </template>
    </v-ons-alert-dialog>
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
    async getForecastWind() {
      const params = {
        course_id: this.course.id,
      };
      let forecastWind = {};

      this.compassErrorVisible = false;
      try {
        forecastWind = await this.$store.dispatch('models/weather/getForecastWind', params);
      } catch (error) {
        this.compassErrorVisible = true;
      }

      return forecastWind;
    },
    goBackToCourseList() {
      this.compassErrorVisible = false;
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
  overflow: hidden;
}

.course-info {
  margin-bottom: 30px;
  font-weight: 300;
  text-align: center;
}
</style>
