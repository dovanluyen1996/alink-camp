<template>
  <div>
    <label
      v-for="label in labels"
      :key="label.value"
      class="radio-field"
    >
      <v-ons-radio
        v-model="selectedValue"
        :value="label.value"
        modifier="material"
      />
      {{ label.text }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'RadioField',
  props: {
    value: {
      // NOTE: htmlのinputはString, サーバーではintで持っているので両方許可する
      type: [Number, String],
      default: -1,
      required: true,
    },
    labels: {
      type: Array,
      default: () => [],
      required: true,
    },
    title: {
      type: String,
      default: null,
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

.radio-field {
  display: inline-block;
  padding: 5px 0;
  font-weight: 600;
}

.radio-button {
  margin-right: 5px;
  vertical-align: baseline;
}
</style>
