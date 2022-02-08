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
        <check-field
          v-model="labels[index].value"
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
      <v-ons-button
        modifier="primary rounded"
        @click="registerLabel"
      >
        選択
      </v-ons-button>
    </template>
  </v-ons-alert-dialog>
</template>

<script>
// components
import CheckField from '@/components/organisms/form/check-field';

export default {
  components: {
    CheckField,
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
        { name: 'Test1', value: false },
        { name: 'Test2', value: false },
        { name: 'Test3', value: false },
        { name: 'Test4', value: false },
        { name: 'Test5', value: false },
        { name: 'Test6', value: false },
        { name: 'Test7', value: false },
        { name: 'Test8', value: false },
        { name: 'Test9', value: false },
        { name: 'Test10', value: false },
      ],
    };
  },
  computed: {
    selectedLabels() {
      return this.labels
        .filter(label => label.value)
        .map(label => label.name);
    },
  },
  methods: {
    isDisable(labelName) {
      return this.selectedLabels.length >= 3 && !this.selectedLabels.includes(labelName);
    },
    closeLabelList() {
      this.$emit('update:isVisibleLabelList', false);
    },
    registerLabel() {
      // TODO: Implement function when register label
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
    max-height: 78vh;
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

  &__text {
    display: flex;
    align-items: center;
    height: 50px;
    padding-left: 5px;
    font-size: 14px;
    font-weight: 300;
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
}

</style>