<template>
  <div>
    <div class="card__title">
      エリアを指定
    </div>
    <custom-select
      v-model="prefectureValue"
      :options="prefectureOptions"
      placeholder="都道府県を選択してください"
    />
    <div class="card__title">
      天候を知りたい日付選択（必須）
    </div>
    <custom-datetime-input
      :value="dateValue"
      type="date"
      placeholder="日にち"
      @input="inputDate"
    />
    <course-search-conditions-fields />
  </div>
</template>

<script>
// components
import CustomSelect from '@/components/atoms/form/custom-select';
import CustomDatetimeInput from '@/components/atoms/form/custom-datetime-input';
import CourseSearchConditionsFields from '@/components/organisms/course-search/conditions-fields.vue';

export default {
  name: 'CourseSearch',
  components: {
    CustomSelect,
    CustomDatetimeInput,
    CourseSearchConditionsFields,
  },
  data() {
    return {
      // TODO: src/components/organisms/user/user-prefecture.vue
      //       にも都道府県リストがあるので一元管理してください
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
      prefectureValue: -1,
    };
  },
  computed: {
    searchConditions: {
      get() {
        return this.$store.state.courseSearchNavigator.searchConditions;
      },
      set(newValue, oldValue) {
        // NOTE: eslintのルールに従うとjsエラーがでるので除外
        /* eslint-disable-next-line prefer-object-spread */
        const newConditions = Object.assign({}, oldValue);
        Object.assign(newConditions, newValue);

        this.$store.commit('courseSearchNavigator/setSearchConditions', newConditions);
      },
    },
    dateValue: {
      get() {
        return this.searchConditions.date;
      },
      set(newValue) {
        this.searchConditions = { date: newValue };
      },
    },
  },
  watch: {
    prefectureValue(newValue) {
      this.searchConditions = { prefecture: newValue };
    },
  },
  methods: {
    inputDate(value) {
      this.dateValue = value;
    },
  },
};
</script>

<style scoped lang="scss">
</style>
