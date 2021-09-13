<template>
  <div class="course-search-location-tab">
    <validation-observer
      ref="searchLocation"
    >
      <div class="card__title card__title--center">
        検索範囲選択（必須）
      </div>
      <validation-provider
        v-slot="{ errors }"
        rules="required-select"
        name="検索範囲"
      >
        <custom-select
          v-model="distance"
          :options="distanceOptions"
          placeholder="検索範囲を選択してください"
          :errors="errors"
        />
      </validation-provider>

      <course-search-date-field v-model="targetDate" />

      <annotations-block>
        ※予報は本日から10日目までとなります。それ以上は過去のお天気をもとに予測したデータとなります。（最大1ヶ月先まで）<br>
        ※紫外線、風の強さに関しては10日目までの予報となります。
      </annotations-block>

      <course-search-conditions-fields
        :sunny.sync="sunny"
        :temperature.sync="temperature"
        :wind.sync="wind"
        :uv.sync="uv"
        :date.sync="targetDate"
      />
    </validation-observer>

    <v-ons-alert-dialog
      :visible.sync="searchResultEmptyVisible"
    >
      <template #title>
        該当するコースがありません
      </template>

      検索した結果、条件に合うゴルフコースがありませんでした。<br>
      お手数ですが、再度検索条件を設定してください。

      <template #footer>
        <v-ons-button
          @click="closeSearchResultEmptyDialog()"
        >
          OK
        </v-ons-button>
      </template>
    </v-ons-alert-dialog>

    <v-ons-alert-dialog
      :visible.sync="geoLocationErrorVisible"
    >
      <template #title>
        位置情報が取得できませんでした
      </template>

      位置情報が取得できませんでした。<br>
      お手数ですが、通信状況の良いところで再度お試しください。または、アプリの設定にて位置情報送信の許諾をしているかご確認ください

      <template #footer>
        <v-ons-button
          @click="closeGeoLocationErrorDialog()"
        >
          OK
        </v-ons-button>
      </template>
    </v-ons-alert-dialog>
  </div>
</template>

<script>
// pages
import SearchResult from '@/views/course-search/search-result';

// components
import CustomSelect from '@/components/atoms/form/custom-select';
import CourseSearchDateField from '@/components/organisms/course-search/date-field';
import AnnotationsBlock from '@/components/atoms/form/annotations-block';
import CourseSearchConditionsFields from '@/components/organisms/course-search/conditions-fields.vue';

import settings from '@/config/settings';

export default {
  name: 'CourseSearchLocationTab',
  components: {
    CustomSelect,
    CourseSearchDateField,
    AnnotationsBlock,
    CourseSearchConditionsFields,
  },
  data() {
    return {
      distanceOptions: [
        {
          value: 0,
          text: '〜30km',
        },
        {
          value: 1,
          text: '〜50km',
        },
        {
          value: 2,
          text: '〜80km',
        },
        {
          value: 3,
          text: '〜100km',
        },
        {
          value: 4,
          text: '〜150km',
        },
        {
          value: 5,
          text: '〜200km',
        },
      ],
      distance: -1,
      targetDate: '',
      temperature: '',
      sunny: false,
      wind: false,
      uv: false,
      lat: null,
      lon: null,
      upper_rad: null,
      lower_rad: null,
      searchResultEmptyVisible: false,
      geoLocationErrorVisible: false,
    };
  },
  computed: {
    searched() {
      return this.$store.state.course.searched;
    },
    activeIndex() {
      return this.$store.state.components.cardWithTab.activeIndex;
    },
  },
  watch: {
    distance(value) {
      // 〜30km：upper_rad=30&lower_rad=
      // 〜50km：upper_rad=50&lower_rad=
      // 〜80km：upper_rad=80&lower_rad=
      // 〜100km：upper_rad=100&lower_rad=
      // 〜150km：upper_rad=150&lower_rad=
      // 〜200km：upper_rad=200&lower_rad=
      switch (value) {
      case 0:
        this.lower_rad = null;
        this.upper_rad = 30;
        break;
      case 1:
        this.lower_rad = null;
        this.upper_rad = 50;
        break;
      case 2:
        this.lower_rad = null;
        this.upper_rad = 80;
        break;
      case 3:
        this.lower_rad = null;
        this.upper_rad = 100;
        break;
      case 4:
        this.lower_rad = null;
        this.upper_rad = 150;
        break;
      case 5:
        this.lower_rad = null;
        this.upper_rad = 200;
        break;
      default:
        this.lower_rad = null;
        this.upper_rad = null;
      }
    },
    searched() {
      // If current tab is not location, don't search area
      if (this.activeIndex !== 1) return;
      // Watch click search button event.
      if (!this.searched) return;

      this.searchByLocation();
    },
  },
  methods: {
    searchByLocation() {
      Promise.resolve()
        .then(() => this.getGeoLocation())
        .then(() => this.search())
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          // Reset search flag to false
          this.$store.commit('course/setSearched', false);
        });
    },
    search() {
      this.$refs.searchLocation.validate()
        .then(async(valid) => {
          // Reset before search result
          this.$store.dispatch('models/course/resetCourses');

          if (!valid) return;

          const params = {
            lower_rad: this.lower_rad,
            upper_rad: this.upper_rad,
            target_date: this.targetDate,
            temperature: this.temperature,
            sunny: this.sunny ? 1 : 0,
            wind: this.wind ? 1 : 0,
            uv: this.uv ? 1 : 0,
            lat: this.lat,
            lon: this.lon,
          };

          await this.$store.dispatch('models/course/getCourses', params);

          if (this.$store.getters['models/course/size']) {
            this.goToSearchResult(params);
          } else {
            this.showSearchResultEmptyDialog();
          }
        });
    },
    goToSearchResult(params) {
      const searchConditions = { ...params, type: 'location' };
      this.$store.dispatch('courseSearchNavigator/push', {
        extends: SearchResult,
        onsNavigatorProps: {
          title: 'コース検索結果',
          searchConditions,
        },
      });
    },
    getGeoLocation() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.lat = position.coords.latitude;
            this.lon = position.coords.longitude;

            resolve();
          }, (e) => {
            this.lat = null;
            this.lon = null;
            this.showGeoLocationErrorDialog();

            reject(e);
          }, {
            timeout: settings.locationServices.timeout,
          },
        );
      });
    },
    closeSearchResultEmptyDialog() {
      this.searchResultEmptyVisible = false;
    },
    showSearchResultEmptyDialog() {
      this.searchResultEmptyVisible = true;
    },
    closeGeoLocationErrorDialog() {
      this.geoLocationErrorVisible = false;
    },
    showGeoLocationErrorDialog() {
      this.geoLocationErrorVisible = true;
    },
  },
};
</script>

<style scoped lang="scss">
.course-search-location-tab {
  overflow: hidden;
}

.select {
  width: 100%;
}
</style>
