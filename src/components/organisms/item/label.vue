<template>
  <div class="item-label">
    <span class="item-label__title">
      ラベル
    </span>
    <div class="item-label__box">
      <div
        v-if="labels && labels.length > 0"
        class="item-label__labels"
      >
        <div
          v-for="label in labels"
          :key="label"
          class="item-label__label"
          :style="styles(label)"
        >
          <span class="item-label__label__text">
            {{ label.name }}
          </span>
        </div>
      </div>
      <p
        v-else
        class="item-label__text"
      >
        設定しているラベルがありません。
      </p>
    </div>
    <div
      class="item-label__button"
      @click="showLabelListDialog"
    >
      <v-ons-button modifier="cta red">
        <img
          src="@/assets/images/form/icon-add.png"
          class="item-label__image"
          width="24px"
          height="24px"
        >
        ラベル編集
      </v-ons-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ItemLabel',
  props: {
    labels: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    showLabelListDialog() {
      this.$emit('showLabelListDialog');
    },
    styles(label) {
      return {
        '--background-color': label.color,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.item-label {
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
    text-align: center;
    background-color: var(--background-color);

    &__text {
      color: var(--background-color);
      filter: invert(100%) grayscale(100%) contrast(100);
    }
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
    margin-right: 5px;
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
