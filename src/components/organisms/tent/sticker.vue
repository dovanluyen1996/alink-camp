<template>
  <div class="tent-sticker">
    <div class="tent-sticker__top">
      <span class="tent-sticker__title">
        ラベル
      </span>
      <div
        v-if="sticker && sticker.labels.length > 0"
        class="tent-sticker__labels"
      >
        <div
          v-for="label in sticker.labels"
          :key="label"
          class="tent-sticker__label"
        >
          {{ label }}
        </div>
      </div>
    </div>
    <div class="tent-sticker__content">
      <div
        v-if="!sticker.labels.length > 0"
        class="tent-sticker__text"
      >
        設定しているラベルがありません。
      </div>
      <div
        class="tent-sticker__button"
        @click="showLabelList"
      >
        <v-ons-button modifier="cta red">
          <img
            class="tent-sticker__image"
            src="@/assets/images/red-cross.png"
          >
          ラベル編集
        </v-ons-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TentSticker',
  props: {
    sticker: {
      type: Object,
      default: null,
    },
  },
  methods: {
    showLabelList() {
      this.$emit('showLabelList');
    },
  },
};
</script>

<style lang="scss" scoped>
.tent-sticker {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 190px;
  padding: 0 20px;
  margin-top: 10px;

  &__top {
    display: flex;
    flex-direction: column;
    justify-content: start;
  }

  &__title {
    font-size: 18px;
    font-weight: 600;
  }

  &__labels {
    display: flex;
    margin-top: 10px;
  }

  &__label {
    width: 62px;
    height: 20px;
    margin-right: 5px;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
    text-align: center;
    background-color: #4c7dae;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100px;
    padding: 20px;
  }

  &__text {
    font-size: 14px;
    font-weight: 600;
  }

  &__image {
    margin: 5px;
  }
}

/deep/ {
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
  }
}
</style>
