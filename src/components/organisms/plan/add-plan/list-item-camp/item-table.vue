<template>
  <div class="items-table">
    <div class="items">
      <div class="items__header">
        <div
          class="items__label items__label--plus"
          @click="selectAll"
        >
          全選択
        </div>
        <div
          class="items__label items__label--minus"
          @click="unSelectAll"
        >
          全解除
        </div>
        <div
          class="items__label items__label--red"
          @click="showLabelFilterDialog"
        >
          ラベルソート
        </div>
      </div>

      <div
        v-for="item in filteredItems"
        :key="item"
        :class="['items__list', {'items__list--active': item.userId}]"
      >
        <div class="items__list--content">
          <check-group-field
            :checked-values.sync="checkedItems"
            :checked-value="item.id"
            :label="truncate(item.name, 7)"
            :disable="disable"
          />
        </div>
        <div class="items__list--label">
          <div
            v-for="label in item.labels"
            :key="label.id"
            class="items__list--label-tick"
            :style="styles(label)"
          >
            <span class="items__list--label-tick__text">
              {{ truncate(label.name, 4) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <label-filter-dialog
      :checked-label-ids.sync="checkedLabelIds"
      :is-visible-label-filter.sync="isVisibleLabelFilterDialog"
    />
  </div>
</template>

<script>
// components
import CheckGroupField from '@/components/organisms/form/check-group-field';
import LabelFilterDialog from '@/components/organisms/label-filter-dialog';

export default {
  components: {
    CheckGroupField,
    LabelFilterDialog,
  },
  props: {
    checkedItemIds: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      checkedLabelIds: [],
      isVisibleLabelFilterDialog: false,
    };
  },
  computed: {
    filteredItems() {
      if (this.checkedLabelIds.length === 0) return this.items;

      const isCheckedLabel = (item) => {
        const labelIds = item.labels.map(label => label.id);
        if (labelIds.length < this.checkedLabelIds.length) return false;

        return this.checkedLabelIds.every(id => labelIds.includes(id));
      };

      return this.items.filter(isCheckedLabel);
    },
    checkedItems: {
      get() {
        return this.checkedItemIds;
      },
      set(newValue) {
        this.$emit('update:checkedItemIds', newValue);
      },
    },
  },
  methods: {
    truncate(value, limit) {
      return this.$helpers.truncate(value, limit);
    },
    styles(label) {
      return {
        '--background-color': label.color,
      };
    },
    selectAll() {
      this.$emit('update:checkedItemIds', this.items.map(item => item.id));
    },
    unSelectAll() {
      this.$emit('update:checkedItemIds', []);
    },
    showLabelFilterDialog() {
      this.isVisibleLabelFilterDialog = true;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

/deep/ {
  .custom-input {
    background: $color-white;
    border: 1px solid $color-border-dark !important;
  }
}

.items-table {
  margin: 20px 10px;

  .items {
    width: 100%;
    background-color: $color-white;

    &__header {
      padding: 10px 8px;
      background-color: #eae5e5;
      overflow: hidden;
    }

    &__label {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 24px;
      padding: 5px 0;
      font-weight: 600;
      color: $color-white;
      text-align: center;
      background-color: #742a2a;
      float: left;

      &::before {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 5px;
        content: '';
        background-position: center;
        background-size: 100%;
      }
    }
  }

  .items__label--red {
    font-size: #font-size-small;
    background-color: #a82e05;
    border-radius: 15px;
    float: right;

    &::before {
      width: 16px;
      height: 16px;
      background-image: url("~@/assets/images/icon-sort.png");
    }
  }

  .items__label--plus {
    margin-right: 10px;

    &::before {
    background-image: url("~@/assets/images/icon-choose-plus.png");
  }

  .items__label--minus::before {
    background-image: url("~@/assets/images/icon-choose-minus.png");
  }

  .items__list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 5px;
    font-size: 12px;
    font-weight: 600;
    border: 1px solid #d9d9d9;

    &--active {
      background-color: $color-active-orange;
    }

    &--content,
    &--label {
      display: flex;
      column-gap: 5px;
      align-items: center;
    }

    &--label-tick {
      padding: 5px 8px;
      background-color: var(--background-color);

      &__text {
        color: var(--background-color);
        filter: invert(100%) grayscale(100%) contrast(100);
      }
    }
  }
}

@media screen and (max-width: 374px) {
  // TODO: iPhoneSE 1stは画面が狭いのでソートなどのボタンが崩れないようにする
  .items__label {
    font-size: #font-size-small;
  }
}
</style>
