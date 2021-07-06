<template>
  <div>
    <div
      v-for="label in labels"
      :key="label.value"
      class="custom-radio"
    >
      <label class="custom-radio-label">
        <v-ons-radio
          v-model="selectedValue"
          :value="label.value"
          modifier="material"
        />
        {{ label.text }}
      </label>
    </div>
    <div
      v-if="errors.length"
      class="input-error-msg"
    >
      {{ errors[0] }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomRadio',
  props: {
    value: {
      type: [Number, String],
      default: -1,
      required: true,
    },
    labels: {
      type: Array,
      default: () => [],
      required: true,
    },
    errors: {
      type: Array,
      default: () => [],
    },
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
  :checked + .radio-button--material__checkmark::before {
    border-color: $color-border;
  }
}

.custom-radio-label {
  display: inline-block;
  padding: 5px 0;
  font-weight: 600;
}

.radio-button {
  margin-right: 5px;
  vertical-align: baseline;
}
</style>
