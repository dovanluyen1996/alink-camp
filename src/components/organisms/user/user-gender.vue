<template>
  <base-field
    title="性別"
    class="user-gender"
  >
    <radio-field
      v-model="selectedValue"
      :labels="genderLabels"
      class="user-gender__field"
    />
  </base-field>
</template>

<script>
// components
import BaseField from '@/components/organisms/form/base-field';
import RadioField from '@/components/organisms/form/radio-field';

export default {
  name: 'UserGender',
  components: {
    BaseField,
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

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

/deep/ {
  .card {
    padding: 10px 0;
    text-align: center;
  }

  .radio-field {
    margin: 0 20px;
    font-size: 16px;
  }

  :checked + .radio-button--material__checkmark::before {
    border-color: $color-border;
  }
}
</style>
