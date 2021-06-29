<template>
  <radio-field
    v-model="selectedValue"
    :labels="genderLabels"
    title="性別"
    class="user-gender__field"
    :errors="errors"
  />
</template>

<script>
import settings from '@/config/settings';

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
    errors: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      genderLabels: settings.views.genders,
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
