<template>
  <div>
    <div class="card__title card__title--center">
      エリアを指定（必須）
    </div>
    <custom-select
      v-model="prefectureValue"
      :options="prefectureOptions"
      placeholder="都道府県を選択してください"
    />

    <course-search-date-field />

    <annotations-block>
      ※予報は本日から10日目までとなります。それ以上は過去のお天気をもとに予測したデータとなります。<br>
      ※紫外線、風の強さに関しては10日目までの予報となります。
    </annotations-block>

    <course-search-conditions-fields />
  </div>
</template>

<script>
// components
import CustomSelect from '@/components/atoms/form/custom-select';
import CourseSearchDateField from '@/components/organisms/course-search/date-field';
import AnnotationsBlock from '@/components/atoms/form/annotations-block';
import CourseSearchConditionsFields from '@/components/organisms/course-search/conditions-fields.vue';

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
      // TODO: ダミーデータなので変更してください
      prefectureOptions: [
        {
          value: 0,
          text: '北海道',
        },
        {
          value: 1,
          text: '東京',
        },
        {
          value: 2,
          text: '沖縄',
        },
      ],
    };
  },
  computed: {
    searchConditions() {
      return this.$store.state.courseSearchNavigator.searchConditions;
    },
    prefectureValue: {
      get() {
        return this.searchConditions.prefecture;
      },
      set(prefecture) {
        this.$store.commit('courseSearchNavigator/setSearchConditions', { prefecture });
      },
    },
  },
};
</script>

<style scoped lang="scss">
.select {
  width: 100%;
}
</style>
