<template>
  <div class="course-search-location-tab">
    <div class="card__title card__title--center">
      検索範囲選択（必須）
    </div>
    <custom-select
      v-model="distanceValue"
      :options="distanceOptions"
      placeholder="検索範囲を選択してください"
    />

    <course-search-date-field />

    <annotations-block>
      ※予報は本日から10日目までとなります。それ以上は過去のお天気をもとに予測したデータとなります。（最大1ヶ月先まで）<br>
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
  name: 'CourseSearchLocationTab',
  components: {
    CustomSelect,
    CourseSearchDateField,
    AnnotationsBlock,
    CourseSearchConditionsFields,
  },
  data() {
    return {
      // TODO: ダミーデータなので変更してください
      distanceOptions: [
        {
          value: 0,
          text: '〜50m',
        },
        {
          value: 1,
          text: '〜100m',
        },
        {
          value: 2,
          text: '〜500m',
        },
      ],
    };
  },
  computed: {
    searchConditions() {
      return this.$store.state.courseSearchNavigator.locationSearchConditions;
    },
    distanceValue: {
      get() {
        return this.searchConditions.distance;
      },
      set(distance) {
        this.$store.commit('courseSearchNavigator/setLocationSearchConditions', { distance });
      },
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
