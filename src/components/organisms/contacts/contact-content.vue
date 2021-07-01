<template>
  <div class="input-field">
    <div class="input-field-title">
      内容
    </div>
    <div class="input-field-body">
      <span class="input-field-note">
        ※特殊文字、機種依存文字をご使用いただきますと、送信時に文字化けする可能性がございますのでご留意ください。
      </span>
      <textarea
        v-model="inputedValue"
        class="textarea-input"
        :rows="8"
      />
      <div v-if="errors.length">
        {{ errors[0] }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactContent',
  props: {
    value: {
      type: String,
      default: '',
      requier: true,
    },
    errors: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
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
@import '@/assets/scss/_mixins.scss';

.input-field-title {
  @include title-style;

  margin-bottom: 10px;
}

.input-field-body {
  .input-field-note {
    display: block;
    margin-bottom: 10px;
    font-weight: 300;
    line-height: 1.7;
  }
}
</style>
