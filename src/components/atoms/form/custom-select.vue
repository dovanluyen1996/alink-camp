<template>
  <div>
    <v-ons-select v-model="selectedValue">
      <option
        :value="-1"
        selected
        class="placeholder"
      >
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </v-ons-select>
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
  name: 'CustomSelect',
  props: {
    value: {
      type: [Number, String],
      default: -1,
      required: true,
    },
    options: {
      type: Array,
      default: () => [],
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
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
/* NOTE: selectはplaceholder非対応なので
         optionの1件目にplaceholder表示したいテキストを入れ
         かつ選択肢には出ないようにしている */
.placeholder {
  display: none;
}

/deep/ .select-input {
  padding-right: 30px;
  font-size: 16px;
  font-weight: 600;
  line-height: 28px;
  background-image: url('~@/assets/images/form/select-arrow.png');
  background-position: 98%;
  background-size: 30px;
  background-size: 17px 15px;
}
</style>
