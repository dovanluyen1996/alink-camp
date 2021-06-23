<template>
  <radio-field
    v-model="selectedValue"
    :labels="genderLabels"
    title="性別"
    class="user-gender__field"
  />
</template>

<script>
// components
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

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

/deep/ {
  .card {
    padding: 10px 0;
    text-align: center;
  }

  .custom-radio {
    display: inline-block;
  }

  .custom-radio-label {
    margin: 0 20px;
    font-size: 16px;
  }

  :checked + .radio-button--material__checkmark::before {
    border-color: $color-border;
  }
}
</style>
