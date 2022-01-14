<template>
  <div class="tent-sticker">
    <span class="tent-sticker__title">
      ラベル
    </span>
    <div class="tent-sticker__box">
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
      <p
        v-else
        class="tent-sticker__text"
      >
        設定しているラベルがありません。
      </p>
    </div>
    <div class="tent-sticker__button">
      <v-ons-button modifier="cta red">
        <img
          class="tent-sticker__image"
          src="@/assets/images/red-cross.png"
        >
        ラベル編集
      </v-ons-button>
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
};
</script>

<style lang="scss" scoped>
.tent-sticker {
  height: 190px;
  padding: 0 20px;
  margin-top: 10px;

  &__title {
    display: flex;
    flex-direction: column;
    justify-content: start;
    font-size: 18px;
    font-weight: 600;
  }

  &__labels {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    justify-content: flex-start;
  }

  &__label {
    height: 20px;
    padding: 2px 5px;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
    text-align: center;
    background-color: #4c7dae;
  }

  &__box {
    height: 80px;
    margin-top: 10px;
  }

  &__text {
    margin-top: 40px;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
  }

  &__button {
    display: flex;
    justify-content: center;
  }

  &__image {
    margin: 5px;
  }
}

/deep/ {
  .button {
    display: flex;
    align-items: center;
    width: 200px;
    padding-left: 30px;
  }
}
</style>
