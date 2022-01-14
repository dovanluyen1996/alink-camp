<template>
  <div class="tent-name">
    <div class="tent-name__top">
      <div class="tent-name__title">
        アイテム名
      </div>
      <span
        v-if="sticker.user_id"
        class="tent-name__sub-title"
      >
        （全角10文字以内）
      </span>
    </div>
    <v-ons-input
      v-model="inputedValue"
      type="text"
      class="tent-name__input"
    />
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
  name: 'TentName',
  props: {
    errors: {
      type: Array,
      default: () => [],
    },
    sticker: {
      type: Object,
      default: null,
    },
    value: {
      type: String,
      default: '',
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

.tent-name {
  padding: 0 20px;
  margin-top: 30px;

  &__top {
    display: flex;
    align-items: center;
  }

  &__title {
    @include title-style;
  }

  &__sub-title {
    font-size: 12px;
    font-weight: 600;
    color: #222;
  }

  &__input {
    width: 100%;
    margin-top: 2px;
    text-align: center;
  }
}

/deep/ {
  .text-input {
    height: 43px;
    padding: 0;
    font-size: 18px;
    text-indent: 8px;
    background: #fff;
    border: 2px solid #90bfd8;
  }
}
</style>
