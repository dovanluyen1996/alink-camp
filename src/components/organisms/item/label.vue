<template>
  <div class="item-sticker">
    <span class="item-sticker__title">
      ラベル
    </span>
    <div class="item-sticker__box">
      <div
        v-if="sticker && sticker.labels.length > 0"
        class="item-sticker__labels"
      >
        <div
          v-for="label in sticker.labels"
          :key="label"
          class="item-sticker__label"
        >
          {{ label }}
        </div>
      </div>
      <p
        v-else
        class="item-sticker__text"
      >
        設定しているラベルがありません。
      </p>
    </div>
    <div
      class="item-sticker__button"
      @click="showLabelListDialog"
    >
      <v-ons-button modifier="cta red">
        <img
          class="item-sticker__image"
          src="@/assets/images/red-cross.png"
        >
        ラベル編集
      </v-ons-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemSticker',
  props: {
    sticker: {
      type: Object,
      default: null,
    },
  },
  methods: {
    showLabelListDialog() {
      this.$emit('showLabelListDialog');
    },
  },
};
</script>

<style lang="scss" scoped>
.item-sticker {
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
    min-height: 80px;
    margin: 10px 0;
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
    justify-content: center;
    width: 200px;
  }
}
</style>
