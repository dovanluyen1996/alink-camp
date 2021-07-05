<template>
  <div class="course-search-area-tab">
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
          placeholder="都道府県を選択してください"
          :errors="errors"
        />
      </validation-provider>

      <course-search-date-field
        v-model="targetDate"
      />

      <annotations-block>
        ※予報は本日から10日目までとなります。それ以上は過去のお天気をもとに予測したデータとなります。<br>
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
      prefecture: -1,
      targetDate: '',
      temperature: '',
      sunny: false,
      wind: false,
      uv: false,
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
            this.goToSearchResult();
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
