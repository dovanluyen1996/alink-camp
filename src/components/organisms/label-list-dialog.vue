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
        <check-group-field
          :checked-values.sync="checkedValues"
          :checked-value="label.id"
          :label="label.name"
          :disable="isDisabled(label.id)"
        />
      </div>
    </div>
    <template #footer>
      <v-ons-button
        modifier="secondary rounded"
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
import CheckGroupField from '@/components/organisms/form/check-group-field';

export default {
  components: {
    CheckGroupField,
  },
  props: {
    checkedLabels: {
      type: Array,
      default: () => [],
    },
    isVisibleLabelList: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      checkedValues: this.checkedLabels.map(label => label.id),
    };
  },
  computed: {
    labels() {
      return this.$store.getters['models/label/labels'];
    },
  },
  watch: {
    async isVisibleLabelList() {
      if (this.isVisibleLabelList) await this.$store.dispatch('models/label/getLabels');
    },
  },
  methods: {
    isDisabled(labelId) {
      return this.checkedValues.length >= 3 && !this.checkedValues.includes(labelId);
    },
    closeLabelList() {
      this.checkedValues = this.checkedLabels.map(label => label.id);
      this.$emit('update:isVisibleLabelList', false);
    },
    registerLabel() {
      this.$emit('update:checkedLabels', this.labels.filter(label => this.checkedValues.includes(label.id)));
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
      color: #fff;
      background-color: #beb9b8;
      box-shadow: 0 5px 5px rgba(0, 0, 0, 0.4);
    }

    &--primary {
      color: #fff;
      background-color: #9a3210;
      box-shadow: 0 5px 5px rgba(0, 0, 0, 0.4);
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

  .alert-dialog-footer {
    display: flex;

    & > ons-button {
      margin: 5px;
    }
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
    color: #222;
    background-color: #fff;
  }

  &__items {
    max-height: 350px;
    overflow: scroll;
    background-color: #fff;
  }

  &__item {
    display: flex;
    align-items: center;
    height: 34px;
    padding-left: 5px;
    border-top: 1px solid #d9d9d9;

    &:last-child {
      border-bottom: 1px solid #d9d9d9;
    }
  }
}

@media screen and (max-width: 375px) {
  .label-list__items {
    max-height: 230px;
  }

  /deep/ {
    .alert-dialog-footer ons-button {
      margin: 2px;
    }
  }
}
</style>
