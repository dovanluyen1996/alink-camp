<template>
  <div class="course-search-area-tab">
    <validation-observer
      ref="guidanceForm"
      v-slot="{ handleSubmit }"
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
          v-model="selectedPrefecture"
          :options="prefectures"
          placeholder="都道府県を選択してください"
          :errors="errors"
        />
      </validation-provider>

      <course-search-date-field />

      <annotations-block>
        ※予報は本日から10日目までとなります。それ以上は過去のお天気をもとに予測したデータとなります。<br>
        ※紫外線、風の強さに関しては10日目までの予報となります。
      </annotations-block>

      <course-search-conditions-fields />

      <v-ons-button
        modifier="large--cta rounded"
        @click="handleSubmit(searchByArea)"
      >
        絞り込み選択
      </v-ons-button>
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
  name: 'CourseSearchAreaTab',
  components: {
    CustomSelect,
    CourseSearchDateField,
    AnnotationsBlock,
    CourseSearchConditionsFields,
  },
  data() {
    return {
      prefectures: settings.views.prefectures,
      searchResultEmptyVisible: false,
    };
  },
  computed: {
    searchConditions() {
      return this.$store.state.courseSearchNavigator.searchConditions;
    },
    selectedPrefecture: {
      get() {
        return this.searchConditions.prefecture;
      },
      set(prefecture) {
        this.$store.commit('courseSearchNavigator/setSearchConditions', { prefecture });
      },
    },
    sunny() {
      if (this.searchConditions.sunny) return 1;

      return 0;
    },
    wind() {
      if (this.searchConditions.wind) return 1;

      return 0;
    },
    uv() {
      if (this.searchConditions.sunny) return 1;

      return 0;
    },
    recordCount() {
      return this.$store.getters['models/course/size'];
    },
  },
  methods: {
    async searchByArea() {
      this.$store.dispatch('models/course/resetCourses');

      const params = {
        prefecture_id: this.searchConditions.prefecture,
        target_date: this.searchConditions.date,
        temperature: this.searchConditions.temperature,
        sunny: this.sunny,
        wind: this.wind,
        uv: this.uv,
      };

      await this.$store.dispatch('models/course/getCourses', params);

      if (this.recordCount) {
        this.goToSearchResult();
      } else {
        this.showSearchResultEmptyDialog();
      }
    },
    closeSearchResultEmptyDialog() {
      this.searchResultEmptyVisible = false;
    },
    showSearchResultEmptyDialog() {
      this.searchResultEmptyVisible = true;
    },
    goToSearchResult() {
      this.$store.dispatch('courseSearchNavigator/push', {
        extends: SearchResult,
        onsNavigatorProps: {
          title: 'コース検索結果',
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.course-search-area-tab {
  overflow: hidden;
}

.select {
  width: 100%;
}
</style>
