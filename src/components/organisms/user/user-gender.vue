<template>
  <radio-field
    v-model="selectedValue"
    :labels="genderLabels"
    title="性別"
  />
</template>

<script>
import RadioField from '@/components/organisms/form/radio-field';

export default {
  name: 'UserGender',
  components: {
    RadioField,
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
      genderLabels: [
        {
          value: 0,
          text: '男性',
        },
        {
          value: 1,
          text: '女性',
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
