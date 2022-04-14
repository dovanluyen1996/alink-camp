<template>
  <div class="campsite-search-area-tab">
    <validation-observer
      ref="searchArea"
    >
      <div class="card__title card__title--center mx-20">
        エリアを指定（必須）
      </div>
      <validation-provider
        v-slot="{ errors }"
        rules="required-select"
        name="都道府県"
      >
        <custom-select
          v-model="prefecture"
          :options="prefectures"
          placeholder="都道府県を選択"
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

    <v-ons-alert-dialog :visible.sync="searchResultEmptyVisible">
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
  name: 'CampsiteSearchAreaTab',
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
      prefectures: settings.views.prefectures,
      searchResultEmptyVisible: false,
      prefecture: -1,
      targetDate: this.$helpers.localDateWithHyphenFrom(new Date()),
      max_temp: '',
      sunny: false,
      wind: false,
      uv: false,
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
    prefectureHeading() {
      return this.prefectures[this.prefecture - 1];
    },
  },
  watch: {
    searched() {
      // If current tab is not area, don't search area
      if (this.activeIndex !== 0) return;
      // Watch click search button event.
      if (!this.searched) return;
      // Reset search flag to false
      this.$store.commit('campsite/setSearched', false);

      this.search();
    },
  },
  methods: {
    search() {
      this.$refs.searchArea.validate()
        .then(async(valid) => {
          this.$store.dispatch('models/campsite/resetCampsites');

          if (!valid) return;

          const areaParams = {
            prefecture_id: this.prefecture,
            target_date: this.targetDate,
            max_temp: this.max_temp,
            sunny: this.sunny ? 1 : 0,
            wind: this.wind ? 1 : 0,
            uv: this.uv ? 1 : 0,
          };
          const facilityParams = this.$refs.facilityCondition.searchParams();
          const params = {
            ...areaParams,
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
    closeSearchResultEmptyDialog() {
      this.searchResultEmptyVisible = false;
    },
    showSearchResultEmptyDialog() {
      this.searchResultEmptyVisible = true;
    },
    goToSearchResult(params) {
      const searchConditions = { ...params, type: 'area' };
      const subtitle = (this.prefectureHeading && this.prefectureHeading.text) ? `（${this.prefectureHeading.text}）` : '';

      this.$store.dispatch('campsiteSearchNavigator/push', {
        extends: SearchResult,
        onsNavigatorProps: {
          title: 'キャンプ場検索結果',
          subtitle,
          searchConditions,
        },
      });
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
.campsite-search-area-tab {
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
