<template>
  <select-field
    v-model="selectedValue"
    :options="prefectureOptions"
    placeholder="都道府県を選択してください"
    title="お住まい"
    :errors="errors"
  />
</template>

<script>
import settings from '@/config/settings';
import SelectField from '@/components/organisms/form/select-field';

export default {
  name: 'UserPrefecture',
  components: {
    SelectField,
  },
  props: {
    value: {
      type: [Number, String],
      default: -1,
      requier: true,
    },
    errors: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      prefectureOptions: settings.views.prefectures,
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
