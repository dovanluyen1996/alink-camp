<template>
  <base-field
    :title="title"
    class="password-field"
  >
    <v-ons-input
      v-model="inputedValue"
      :type="type"
    />
    <div
      v-if="errors.length"
      class="input-error-msg"
    >
      {{ errors[0] }}
    </div>
    <template v-if="canShowPassword">
      <check-field
        v-model="isShownPassword"
        label="パスワードを表示"
      />
    </template>
    <p
      v-if="help"
      class="password-field-help"
      v-text="help"
    >
    </p>
  </base-field>
</template>

<script>
import CheckField from '@/components/organisms/form/check-field';
import BaseField from './base-field';

export default {
  name: 'PasswordField',
  components: {
    BaseField,
    CheckField,
  },
  props: {
    value: {
      type: String,
      default: '',
      required: true,
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
    errors: {
      type: Array,
      default: () => [],
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
  white-space: pre-line;
}

.check-field {
  margin-top: 20px;
}
</style>
