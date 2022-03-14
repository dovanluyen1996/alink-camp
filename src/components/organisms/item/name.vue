<template>
  <div class="item-name">
    <div class="item-name__top">
      <div class="item-name__title">
        アイテム名
      </div>
      <span
        v-if="isUserItem"
        class="item-name__sub-title"
      >
        （全角10文字以内）
      </span>
    </div>
    <v-ons-input
      v-if="isUserItem"
      v-model="inputedValue"
      type="text"
      class="item-name__input"
    />
    <div
      v-else
      class="item-name__box"
    >
      <span class="item-name__note">{{ inputedValue }}</span>
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
  name: 'ItemName',
  props: {
    errors: {
      type: Array,
      default: () => [],
    },
    isUserItem: {
      type: Boolean,
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

.item-name {
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

  &__box {
    display: flex;
    align-items: center;
    height: 50px;
    margin-top: 5px;
    background-color: #fff;
  }

  &__note {
    padding-left: 5px;
    font-size: 18px;
    font-weight: 600;
  }
}

/deep/ {
  .text-input {
    height: 50px;
    padding: 0;
    font-size: 18px;
    text-indent: 8px;
    background: #fff;
    border: 1px solid #90bfd8;
  }
}
</style>
