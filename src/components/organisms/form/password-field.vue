<template>
  <input-base-layout
    :title="title"
    class="password-field"
  >
    <v-ons-input
      v-model="inputedValue"
      :type="type"
    />
    <template v-if="canShowPassword">
      <label class="password-field-swich">
        <custom-checkbox v-model="isShownPassword" />
        <span class="password-field-swich__label-text">
          パスワードを表示
        </span>
      </label>
      <p class="password-field-help">
        ※6文字以上の半角英数字で登録して下さい
      </p>
    </template>
  </input-base-layout>
</template>

<script>
import CustomCheckbox from '@/components/atoms/form/custom-checkbox';
import InputBaseLayout from './base-layout';

export default {
  components: {
    InputBaseLayout,
    CustomCheckbox,
  },
  props: {
    value: {
      type: String,
      default: '',
      requier: true,
    },
    title: {
      type: String,
      default: null,
    },
    canShowPassword: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isShownPassword: false,
    };
  },
  computed: {
    type() {
      return this.isShownPassword ? 'text' : 'password';
    },
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

<style lang="scss" scoped>
.password-field-swich {
  display: inline-flex;
  align-items: center;
  margin-top: 20px;
  font-weight: 600;
  &__label-text {
    margin-left: 8px;
  }
}
.password-field-help {
  margin-bottom: 0;
}
</style>
