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
        v-model="inputedValue"
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
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    inputedValue: {
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
.course-search-date-field {
  margin-top: 30px;
  margin-bottom: 10px;
  text-align: center;

  /deep/ {
    .custom-input-date {
      width: 160px;
      margin: 0 auto;

      &.is-shown-placeholder::before {
        justify-content: center;
      }
    }
  }
}
</style>
