<template>
  <base-field
    :title="title"
    class="password-field"
  >
    <v-ons-input
      v-model="inputedValue"
      :type="type"
    />
    <template v-if="canShowPassword">
      <check-field v-model="isShownPassword">
        パスワードを表示
      </check-field>
    </template>
    <p
      v-if="help"
      class="password-field-help"
    >
      {{ help }}
    </p>
  </base-field>
</template>

<script>
import CheckField from '@/components/organisms/form/check-field';
import BaseField from './base-field';

export default {
  components: {
    BaseField,
    CheckField,
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
    help: {
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
.password-field-help {
  margin-bottom: 0;
}

.check-field {
  margin-top: 20px;
}
</style>
