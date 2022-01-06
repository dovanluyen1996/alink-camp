<template>
  <v-ons-alert-dialog :visible="isVisibleLabelList">
    <template #title>
      ラベル設定
    </template>
    <p class="label-list__text">
      ラベルの登録は3つまで可能です。
    </p>
    <div class="label-list__items">
      <div
        v-for="(label, index) in labels"
        :key="index"
        class="label-list__item"
      >
        <checkbox-field
          v-model="selectedLabels"
          :label="label.name"
          :disable="isDisable(label.name)"
        />
      </div>
    </div>
    <template #footer>
      <v-ons-button
        modifier="secondary"
        @click="closeLabelList"
      >
        キャンセル
      </v-ons-button>
      <v-ons-button modifier="primary">
        選択
      </v-ons-button>
    </template>
  </v-ons-alert-dialog>
</template>

<script>
// components
import CheckboxField from '@/components/organisms/form/checkbox-field';

export default {
  components: {
    CheckboxField,
  },
  props: {
    isVisibleLabelList: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      labels: [
        { name: 'Test1' },
        { name: 'Test2' },
        { name: 'Test3' },
        { name: 'Test4' },
        { name: 'Test5' },
        { name: 'Test6' },
        { name: 'Test7' },
        { name: 'Test8' },
        { name: 'Test9' },
        { name: 'Test10' },
      ],
      selectedLabels: [],
    };
  },
  methods: {
    isDisable(labelName) {
      if (this.selectedLabels.length >= 3) {
        return this.selectedLabels.indexOf(labelName) === -1;
      }
      return false;
    },
    closeLabelList() {
      this.$emit('update:isVisibleLabelList', false);
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ {
  .custom-input {
    border: 1px solid #707070;
  }

  .content-with-footer__content {
    position: relative;
    z-index: 99;
  }

  .button {
    &--secondary {
      color: #222;
      background-color: #fff;
    }

    &--primary {
      color: #fff;
      background-color: #9a3210;
    }
  }

  .alert-dialog-container {
    max-height: 72vh;
    overflow: scroll;
  }

  .alert-dialog-title {
    margin-bottom: 0;
  }

  .alert-dialog-content {
    padding: 0;
  }
}

.label-list {
  position: absolute;
  top: 2px;
  right: 10px;
  bottom: 15px;
  left: 10px;
  z-index: 99;
  overflow: scroll;
  background-color: #fff;
  border-radius: 5px;

  &__top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    background-color: #c83200;
  }

  &__text {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: #222;
    background-color: #fff;
  }

  &__items {
    background-color: #fff;
  }

  &__item {
    display: flex;
    align-items: center;
    height: 34px;
    padding-left: 5px;
    border-top: 1px solid #d9d9d9;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 30px 20px;

    .button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 140px;
      padding: 15px;
    }
  }
}

</style>
