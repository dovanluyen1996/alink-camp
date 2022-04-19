<template>
  <div class="campsite-search-date-field">
    <div class="card__title card__title--center">
      キャンプの計画予定日（必須）
    </div>
    <div>
      <validation-provider
        v-slot="{ errors }"
        rules="required|required-future-day|required-one-year-later"
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
  </div>
</template>

<script>
// components
import CustomDatetimeInput from '@/components/atoms/form/custom-datetime-input';

export default {
  name: 'CampsiteSearchDateField',
  components: {
    CustomDatetimeInput,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    errors: {
      type: Array,
      default: () => [],
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
.campsite-search-date-field {
  margin-top: 30px;
  margin-bottom: 10px;
  text-align: center;

  /deep/ {
    .custom-input-date {
      width: 160px;
      margin: 0 auto;

      &.is-shown-placeholder::before {
        justify-content: center;
        padding-right: 28px;
        padding-left: 0;
      }
    }
  }
}
</style>
