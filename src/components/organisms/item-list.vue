<template>
  <div class="item-list">
    <v-ons-card>
      <div class="content">
        <v-ons-list modifier="noborder">
          <v-ons-list-item
            v-for="item in items"
            :key="item.id"
            modifier="chevron nodivider"
            @click="goToTentsEdit(tent)"
          >
            <div :class="['list-item__box', {'list-item--active': item.user_id}]">
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
import TentsEdit from '@/views/tents/edit';

export default {
  name: 'ItemList',
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    goToTentsEdit(tent) {
      this.$store.dispatch('appNavigator/push', {
        extends: TentsEdit,
        onsNavigatorProps: { tent },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
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
    background-color: #f2967857;
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
