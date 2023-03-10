<template>
  <div class="campsite-search-location-tab">
    <validation-observer
      ref="searchLocation"
    >
      <div class="card__title card__title--center mx-20">
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
          class="mx-20"
        />
      </validation-provider>

      <campsite-search-date-field
        v-model="targetDate"
        class="mx-20"
      />

      <annotations-block class="mx-20">
        ※予報は本日から14日目までとなります。それ以上は過去のお天気をもとに予測したデータとなります。<br>
        ※紫外線、風の強さに関しては14日目までの予報となります。<br>
        <template v-if="!isPurchased">
          ※気象条件検索はキャンプ天気会員にご登録頂ければご利用いただけます。
        </template>
      </annotations-block>

      <div class="mx-20">
        <v-ons-button
          class="button--plus button--more button--more__description"
          @click="toggleWeather()"
        >
          <img
            v-if="isShowWeather"
            :src="require('@/assets/images/icon-minus.png')"
            class="icon-minus"
            width="20px"
            height="20px"
          >
          <img
            v-else
            :src="require('@/assets/images/red-cross.png')"
            class="icon-plus"
            width="20px"
            height="20px"
          >
          気象条件
        </v-ons-button>
      </div>

      <annotations-block
        v-show="isShowAnnotationWeather"
        class="mx-20"
      >
        天気予報、気温などの気象条件で絞り込めます
      </annotations-block>

      <div v-show="isShowWeather">
        <campsite-search-conditions-fields
          v-if="isPurchased"
          :sunny.sync="sunny"
          :temperature.sync="max_temp"
          :wind.sync="wind"
          :uv.sync="uv"
          :date.sync="targetDate"
          class="mx-20"
        />

        <campsite-search-not-purchased
          v-else
          class="campsite-search-not-purchased"
        />
      </div>

      <div class="mx-20">
        <v-ons-button
          class="button--plus button--more button--more__description"
          @click="toggleFacility()"
        >
          <img
            v-if="isShowFacility"
            :src="require('@/assets/images/icon-minus.png')"
            class="icon-minus"
            width="20px"
            height="20px"
          >
          <img
            v-else
            :src="require('@/assets/images/red-cross.png')"
            class="icon-plus"
            width="20px"
            height="20px"
          >
          施設条件
        </v-ons-button>
      </div>

      <annotations-block
        v-show="isShowAnnotationFacility"
        class="mx-20"
      >
        ロケーションや周辺施設などの条件を絞り込めます
      </annotations-block>

      <campsite-search-conditions-facility
        v-show="isShowFacility"
        ref="facilityCondition"
        class="mx-20"
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
import SearchResult from '@/views/campsite-search/search-result';

// components
import CustomSelect from '@/components/atoms/form/custom-select';
import CampsiteSearchDateField from '@/components/organisms/campsite-search/date-field';
import AnnotationsBlock from '@/components/atoms/form/annotations-block';
import CampsiteSearchConditionsFields from '@/components/organisms/campsite-search/conditions-fields.vue';
import CampsiteSearchConditionsFacility from '@/components/organisms/campsite-search/conditions-facility.vue';
import CampsiteSearchNotPurchased from '@/components/organisms/campsite-search/not-purchased.vue';

import settings from '@/config/settings';

export default {
  name: 'CampsiteSearchLocationTab',
  components: {
    CustomSelect,
    CampsiteSearchDateField,
    AnnotationsBlock,
    CampsiteSearchConditionsFields,
    CampsiteSearchConditionsFacility,
    CampsiteSearchNotPurchased,
  },
  props: {
    isPurchased: {
      type: Boolean,
    },
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
      targetDate: this.$helpers.localDateWithHyphenFrom(new Date()),
      max_temp: '',
      sunny: false,
      wind: false,
      uv: false,
      lat: null,
      lon: null,
      upper_rad: null,
      lower_rad: null,
      searchResultEmptyVisible: false,
      geoLocationErrorVisible: false,
      isShowWeather: true,
      isShowFacility: true,
      isShowAnnotationWeather: false,
      isShowAnnotationFacility: false,
    };
  },
  computed: {
    searched() {
      return this.$store.state.campsite.searched;
    },
    activeIndex() {
      return this.$store.state.components.cardWithTab.searchCampsiteActiveIndex;
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
          this.$store.commit('campsite/setSearched', false);
        });
    },
    search() {
      this.$refs.searchLocation.validate()
        .then(async(valid) => {
          // Reset before search result
          this.$store.dispatch('models/campsite/resetCampsites');

          if (!valid) return;

          const locationParams = {
            lower_rad: this.lower_rad,
            upper_rad: this.upper_rad,
            target_date: this.targetDate,
            max_temp: this.max_temp,
            sunny: this.sunny ? 1 : 0,
            wind: this.wind ? 1 : 0,
            uv: this.uv ? 1 : 0,
            lat: this.lat,
            lon: this.lon,
          };
          const facilityParams = this.$refs.facilityCondition.searchParams();
          const params = {
            ...locationParams,
            ...facilityParams,
          };

          await this.$store.dispatch('models/campsite/getCampsites', params);

          if (this.$store.getters['models/campsite/size']) {
            this.goToSearchResult(params);
          } else {
            this.showSearchResultEmptyDialog();
          }
        });
    },
    goToSearchResult(params) {
      const searchConditions = { ...params, type: 'location' };
      this.$store.dispatch('campsiteSearchNavigator/push', {
        extends: SearchResult,
        onsNavigatorProps: {
          title: 'キャンプ場検索結果',
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
    toggleWeather() {
      this.isShowWeather = !this.isShowWeather;
      this.isShowAnnotationWeather = !this.isShowAnnotationWeather;
    },
    toggleFacility() {
      this.isShowFacility = !this.isShowFacility;
      this.isShowAnnotationFacility = !this.isShowAnnotationFacility;
    },
  },
};
</script>

<style scoped lang="scss">
.campsite-search-location-tab {
  padding: 20px 0;
  overflow: hidden;
}

.button--plus {
  width: 100%;
  height: 32px;
  margin: 25px 0 12px;
  font-size: 16px;
  background-color: #c83200;
  border-radius: 0;

  img {
    margin-right: 5px;
  }
}

.campsite-search-not-purchased {
  margin-top: 2px;
  margin-bottom: -11px;
}

.mx-20 {
  margin-right: 20px;
  margin-left: 20px;
}

/deep/ {
  .annotations-block {
    font-size: 12px !important;
    color: #000 !important;
  }

  .card__title {
    color: #000 !important;
  }

  .facility-flex,
  .nearby-flex {
    position: relative;
  }
}

</style>
