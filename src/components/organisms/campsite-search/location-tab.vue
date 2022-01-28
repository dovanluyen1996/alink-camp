<template>
  <div class="campsite-search-location-tab">
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
          placeholder="検索範囲を指定してください"
          :errors="errors"
        />
      </validation-provider>

      <campsite-search-date-field
        v-model="targetDate"
      />

      <annotations-block>
        ※予報は本日から14日目までとなります。それ以上は過去のお天気をもとに予測したデータとなります。<br>
        ※紫外線、風の強さに関しては14日目までの予報となります。
      </annotations-block>

      <v-ons-button
        class="button--plus button--more button--more__description"
        @click="toggleWeather()"
      >
        <img
          v-if="isShowWeather"
          :src="require('@/assets/images/icon-minus.png')"
          class="icon-minus"
        >
        <img
          v-else
          :src="require('@/assets/images/icon-plus.png')"
          class="icon-plus"
        >
        気象条件
      </v-ons-button>

      <annotations-block>
        天気予報、気温などの気象条件で絞り込めます
      </annotations-block>

      <campsite-search-conditions-fields
        :sunny.sync="sunny"
        :temperature.sync="temperature"
        :wind.sync="wind"
        :uv.sync="uv"
        :date.sync="targetDate"
        v-show="isShowWeather"
      />

      <v-ons-button
        class="button--plus button--more button--more__description"
        @click="toggleFacility()"
      >
        <img
          v-if="isShowFacility"
          :src="require('@/assets/images/icon-minus.png')"
          class="icon-minus"
        >
        <img
          v-else
          :src="require('@/assets/images/icon-plus.png')"
          class="icon-plus"
        >
        施設条件
      </v-ons-button>

      <annotations-block>
        ロケーションや周辺施設などの条件を絞り込めます
      </annotations-block>

      <campsite-search-conditions-facility
        :sunny.sync="sunny"
        :temperature.sync="temperature"
        :wind.sync="wind"
        :uv.sync="uv"
        :date.sync="targetDate"
        v-show="isShowFacility"
      />
    </validation-observer>

    <v-ons-alert-dialog
      :visible.sync="searchResultEmptyVisible"
    >
      <template #title>
        該当キャンプ場がありません
      </template>

      検索結果に該当するキャンプ場がありませんでした。お手数ですが条件を変えてお試しください。

      <template #footer>
        <v-ons-button @click="closeSearchResultEmptyDialog()">
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

      位置情報が取得できませんでした。お手数ですが、通信状況の良いところで再度お試しください。

      <template #footer>
        <v-ons-button @click="closeGeoLocationErrorDialog()">
          OK
        </v-ons-button>
      </template>
    </v-ons-alert-dialog>
  </div>
</template>

<script>
// pages
// TODO: Search Result page still not implement

// components
import CustomSelect from '@/components/atoms/form/custom-select';
import CampsiteSearchDateField from '@/components/organisms/campsite-search/date-field';
import AnnotationsBlock from '@/components/atoms/form/annotations-block';
import CampsiteSearchConditionsFields from '@/components/organisms/campsite-search/conditions-fields.vue';
import CampsiteSearchConditionsFacility from '@/components/organisms/campsite-search/conditions-facility.vue';

import settings from '@/config/settings';

export default {
  name: 'CampsiteSearchLocationTab',
  components: {
    CustomSelect,
    CampsiteSearchDateField,
    AnnotationsBlock,
    CampsiteSearchConditionsFields,
    CampsiteSearchConditionsFacility,
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
      isShowWeather: false,
      isShowFacility: false,
    };
  },
  computed: {
    // TODO: This method is copied from `courses/location-tab.vue`.
    // Please rewrite when implement Logic
    searched() {
      return this.$store.state.course.searched;
    },
    // TODO: This method is copied from `courses/location-tab.vue`.
    // Please rewrite when implement Logic
    activeIndex() {
      return this.$store.state.components.cardWithTab.searchCourseActiveIndex;
    },
  },
  watch: {
    // TODO: This method is copied from `courses/location-tab.vue`.
    // Please rewrite when implement Logic
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
    // TODO: This method is copied from `courses/location-tab.vue`.
    // Please rewrite when implement Logic
    searched() {
      // If current tab is not location, don't search area
      if (this.activeIndex !== 1) return;
      // Watch click search button event.
      if (!this.searched) return;

      this.searchByLocation();
    },
  },
  methods: {
    // TODO: This method is copied from `courses/location-tab.vue`.
    // Please rewrite when implement Logic
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
    // TODO: This method is copied from `courses/location-tab.vue`.
    // Please rewrite when implement Logic
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
    goToSearchResult() {
      // TODO: Redirect to Search Result page
    },
    // TODO: This method is copied from `courses/location-tab.vue`.
    // Please rewrite when implement Logic
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
    toggleWeather() {
      this.isShowWeather = !this.isShowWeather;
    },
    toggleFacility() {
      this.isShowFacility = !this.isShowFacility;
    },
  },
};
</script>

<style scoped lang="scss">
.campsite-search-location-tab {
  overflow: hidden;
}

.icon-plus,
.icon-minus {
  width: 24px;
  height: 24px;
}

.button--plus {
  width: 100%;
  margin: 25px 0 12px;
  background-color: #c83200;
  border-radius: 0;

  img {
    margin-right: 10px;
  }
}

/deep/ {
  .select {
    width: 100%;
  }

  .annotations-block {
    font-size: 12px !important;
    font-weight: 300;
    color: #000 !important;
  }

  .card__title {
    color: #000 !important;
  }
}

</style>
