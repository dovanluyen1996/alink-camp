<template>
  <div class="course-search-date-field">
    <div class="card__title card__title--center">
      天候を知りたい日付選択（必須）
    </div>
    <custom-datetime-input
      v-model="dateValue"
      type="date"
      placeholder="日にち"
    />
  </div>
</template>

<script>
// components
import CustomDatetimeInput from '@/components/atoms/form/custom-datetime-input';

export default {
  name: 'CourseSearchDateField',
  components: {
    CustomDatetimeInput,
  },
  computed: {
    searchConditions() {
      return this.$store.state.courseSearchNavigator.searchConditions;
    },
    dateValue: {
      get() {
        return this.searchConditions.date;
      },
      set(date) {
        this.$store.commit('courseSearchNavigator/setSearchConditions', { date });
      },
    },
  },
};
</script>

<style scoped lang="scss">
.course-search-date-field {
  margin-top: 30px;
  margin-bottom: 10px;
  text-align: center;
}
</style>
