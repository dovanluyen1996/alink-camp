<template>
  <div>
    エリアを指定
    <select-field
      v-model="selectedValue"
      :options="prefectureOptions"
      placeholder="都道府県を選択してください"
      title="エリアを指定（必須）"
    />
    <course-search-conditions-fields />
  </div>
</template>

<script>
// components
import SelectField from '@/components/organisms/form/select-field';
import CourseSearchConditionsFields from '@/components/organisms/course-search/conditions-fields.vue';

export default {
  name: 'CourseSearch',
  components: {
    SelectField,
    CourseSearchConditionsFields,
  },
  props: {
    value: {
      type: [Number, String],
      default: -1,
      requier: true,
    },
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
    };
  },
  computed: {
    selectedValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue);
      },
    },
  },
};
</script>

<style scoped lang="scss">
</style>
