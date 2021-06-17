<template>
  <select-field
    v-model="selectedValue"
    :options="prefectureOptions"
    placeholder="都道府県を選択してください"
    title="お住まい"
  />
</template>

<script>
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
  },
  data() {
    return {
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
