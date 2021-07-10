<template>
  <div class="course-search-date-field">
    <div class="card__title card__title--center">
      天候を知りたい日付選択（必須）
    </div>

    <validation-provider
      v-slot="{ errors }"
      rules="required"
      name="日にち"
    >
      <custom-datetime-input
        v-model="dateValue"
        type="date"
        placeholder="日にち"
        :errors="errors"
      />
    </validation-provider>
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
    activeIndex() {
      return this.$store.state.course.activeIndex;
    },
    searchConditions() {
      // 0: area, 1: location
      if (this.activeIndex === 0) {
        return this.$store.state.course.areaSearchConditions;
      }
      return this.$store.state.course.locationSearchConditions;
    },
    dateValue: {
      get() {
        return this.searchConditions.date;
      },
      set(date) {
        if (this.activeIndex === 0) {
          this.$store.commit('course/setAreaSearchConditions', { date });
        } else {
          this.$store.commit('course/setLocationSearchConditions', { date });
        }
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
