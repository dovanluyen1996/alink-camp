<template>
  <div class="item-list">
    <v-ons-card>
      <div class="content">
        <v-ons-list modifier="noborder">
          <v-ons-list-item
            v-for="item in items"
            :key="item.id"
            modifier="chevron nodivider"
            @click="goToItemsEdit(item)"
          >
            <div :class="['list-item__box', {'list-item--active': item.userId}]">
              <div class="center">
                <div class="list-item__title">
                  <span>
                    {{ item.name }}
                  </span>
                </div>
              </div>
            </div>
          </v-ons-list-item>
        </v-ons-list>
      </div>
    </v-ons-card>
  </div>
</template>

<script>
// pages
import ItemsEdit from '@/views/items/edit';

export default {
  name: 'ItemList',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    goToItemsEdit(item) {
      this.$store.dispatch('menuNavigator/push', {
        extends: ItemsEdit,
        onsNavigatorProps: { item },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

.card {
  padding-top: 5px;
  padding-bottom: 0;
}

.center {
  padding: 20px 0;
}

.list-item {
  padding-left: 0;

  &__box {
    width: 100%;
    padding-left: 7px;
  }

  &--active {
    background-color: $color-active-orange;
    border: 1px solid #d9d9d9;
  }

  &__title {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    font-size: 18px;
    font-weight: 300;
    line-height: 1.2;
  }
}

/deep/ {
  .list {
    padding: 20px 0;
  }

  .list-item {
    border-top: 1px solid #d9d9d9;

    &:last-child {
      border-bottom: 1px solid #d9d9d9;
    }
  }

  .list-item__center {
    padding: 12px 0;
  }
}
</style>
