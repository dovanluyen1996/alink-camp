<template>
  <div class="items-table">
    <div class="items">
      <div class="items__title">
        <div
          class="items__label"
          @click="selectAll"
        >
          全選択
        </div>
        <div
          class="items__label"
          @click="unSelectAll"
        >
          全解除
        </div>
        <div class="items__label items__label--red">
          ラベルソート
        </div>
        <!-- TODO: Show ラベル一覧 when PR #90 was merged -->
      </div>

      <div
        v-for="item in items"
        :key="item"
        :class="['items__list', {'items__list--active': item.user_id}]"
      >
        <!-- TODO:
      表示するラベル名は4文字まで表示する。5文字以降「…」（例: ああああ… ） -->
        <div class="items__list--content">
          <check-group-field
            :checked-values.sync="checkedItems"
            :checked-value="item.id"
            :label="itemLabel(item.name, 7)"
            :disable="disable"
          />
        </div>
        <div class="items__list--label">
          <div class="items__list--label-tick">
            ラベルB
          </div>
          <div class="items__list--label-tick">
            ラベルA
          </div>
          <div class="items__list--label-tick">
            ラベルB
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// components
import CheckGroupField from '@/components/organisms/form/check-group-field';

export default {
  components: {
    CheckGroupField,
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
  computed: {
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
    itemLabel(label, limit) {
      return this.$helpers.truncate(label, limit);
    },
    selectAll() {
      this.$emit('update:checkedItemIds', this.items.map(item => item.id));
    },
    unSelectAll() {
      this.$emit('update:checkedItemIds', []);
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
  padding: 20px 10px;
  margin-bottom: 100px;

  .items {
    width: 100%;
    background-color: $color-white;

    &__title {
      position: relative;
      padding: 5px;
      background-color: #eae5e5;
    }

    &__label {
      display: inline-block;
      width: 77px;
      padding: 5px 10px;
      margin-right: 10px;
      font-size: 14px;
      font-weight: 600;
      color: $color-white;
      text-align: center;
      background-color: #0061ca;
      border-radius: 15px;

      &--red {
        position: absolute;
        right: 0;
        width: 70px;
        padding: 8px 5px;
        margin-right: 5px;
        font-size: 12px;
        background-color: #a82e05;
      }
    }
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
      color: $color-white;
      background-color: #4c7dae;
    }
  }
}
</style>
