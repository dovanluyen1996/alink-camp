<template>
  <div class="campsite-search-area-tab">
    <validation-observer
      ref="searchArea"
    >
      <div class="card__title card__title--center">
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
        @click="isShowWether = !isShowWether"
      >
        <img
          v-if="isShowWether"
          :src="require('@/assets/images/icon-minus.png')"
          class="icon-minus"
        >
        <img
          v-else
          :src="require('@/assets/images/form/icon-add.png')"
          class="icon-add"
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
        v-show="isShowWether"
      />

      <v-ons-button
        class="button--plus button--more button--more__description"
        @click="isShowFacility = !isShowFacility"
      >
        <img
          v-if="isShowFacility"
          :src="require('@/assets/images/icon-minus.png')"
          class="icon-minus"
        >
        <img
          v-else
          :src="require('@/assets/images/form/icon-add.png')"
          class="icon-add"
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

    <v-ons-alert-dialog :visible.sync="searchResultEmptyVisible">
      <template #title>
        該当するコースがありません
      </template>
      検索した結果、条件に合うゴルフコースがありませんでした。<br>
      お手数ですが、再度検索条件を設定してください。
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
import SearchResult from '@/views/course-search/search-result';

// components
import CustomSelect from '@/components/atoms/form/custom-select';
import CampsiteSearchDateField from '@/components/organisms/campsite-search/date-field';
import AnnotationsBlock from '@/components/atoms/form/annotations-block';
import CampsiteSearchConditionsFields from '@/components/organisms/campsite-search/conditions-fields.vue';
import CampsiteSearchConditionsFacility from '@/components/organisms/campsite-search/conditions-facility.vue';

import settings from '@/config/settings';

export default {
  name: 'CampsiteSearchAreaTab',
  components: {
    CustomSelect,
    CampsiteSearchDateField,
    AnnotationsBlock,
    CampsiteSearchConditionsFields,
    CampsiteSearchConditionsFacility,
  },
  data() {
    return {
      prefectures: settings.views.prefectures,
      searchResultEmptyVisible: false,
      prefecture: -1,
      targetDate: '',
      temperature: '',
      sunny: false,
      wind: false,
      uv: false,
      isShowWether: false,
      isShowFacility: false,
    };
  },
  computed: {
    searched() {
      return this.$store.state.course.searched;
    },
    activeIndex() {
      return this.$store.state.components.cardWithTab.searchCourseActiveIndex;
    },
  },
  watch: {
    searched() {
      // If current tab is not area, don't search area
      if (this.activeIndex !== 0) return;
      // Watch click search button event.
      if (!this.searched) return;
      // Reset search flag to false
      this.$store.commit('course/setSearched', false);

      this.search();
    },
  },
  methods: {
    search() {
      this.$refs.searchArea.validate()
        .then(async(valid) => {
          this.$store.dispatch('models/course/resetCourses');

          if (!valid) return;

          const params = {
            prefecture_id: this.prefecture,
            target_date: this.targetDate,
            temperature: this.temperature,
            sunny: this.sunny ? 1 : 0,
            wind: this.wind ? 1 : 0,
            uv: this.uv ? 1 : 0,
          };

          await this.$store.dispatch('models/course/getCourses', params);

          if (this.$store.getters['models/course/size']) {
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
      this.$store.dispatch('courseSearchNavigator/push', {
        extends: SearchResult,
        onsNavigatorProps: {
          title: 'コース検索結果',
          searchConditions,
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.campsite-search-area-tab {
  overflow: hidden;
}

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

    .select-input {
      height: 50px !important;
      text-align: center;
    }
  }

  .custom-input-date {
    input {
      display: flex;
      align-items: center;
      height: 50px;
    }
  }
}

</style>
