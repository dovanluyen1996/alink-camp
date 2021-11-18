<template>
  <v-ons-page
    @show="show"
    @hide="hide"
  >
    <custom-toolbar title="今の風" />

    <div class="content">
      <loading :visible="isLoading" />
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

    <v-ons-alert-dialog :visible.sync="forecastWindErrorVisible">
      <template #title>
        エラー
      </template>

      {{ forecastWindErrorErrorMsg }}

      <template #footer>
        <v-ons-button @click="goBackToCourseList()">
          コース選択に戻る
        </v-ons-button>
        <v-ons-button @click="show()">
          再度APIを実行する
        </v-ons-button>
      </template>
    </v-ons-alert-dialog>

    <v-ons-alert-dialog :visible.sync="compassErrorVisible">
      <template #title>
        エラー
      </template>

      コンパスの利用ができません。端末の設定を確認してください。または、アプリの設定にて位置情報送信の許諾をしているかご確認ください

      <template #footer>
        <v-ons-button @click="closeCompassErrorDialog()">
          OK
        </v-ons-button>
      </template>
    </v-ons-alert-dialog>

    <v-ons-alert-dialog :visible.sync="noForecastWindDialogVisible">
      <template #title>
        天気情報がありません
      </template>

      天気情報がまだ発表されていません

      <template #footer>
        <v-ons-button @click="closeNoForecastWindDialog()">
          OK
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
      forecastWindErrorVisible: false,
      compassErrorVisible: false,
      noForecastWindDialogVisible: false,
      forecastWindErrorErrorMsg: '',
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters['models/weather/isLoading'];
    },
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

      this.forecastWindErrorVisible = false;
      this.closeNoForecastWindDialog();
      try {
        forecastWind = await this.$store.dispatch('models/weather/getForecastWind', params);
        if (this.$helpers.isEmptyObject(forecastWind)) this.noForecastWindDialogVisible = true;
      } catch (error) {
        this.forecastWindErrorErrorMsg = error.message;
        this.forecastWindErrorVisible = true;
      }

      return forecastWind;
    },
    goBackToCourseList() {
      this.forecastWindErrorVisible = false;
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
      this.$store.commit('windForecastNavigator/pop');
    },
    closeNoForecastWindDialog() {
      this.noForecastWindDialogVisible = false;
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
