<template>
  <v-ons-page @show="show">
    <custom-toolbar title="アイテム設定" />
    <loading :visible="isLoading" />
    <div class="content">
      <content-with-footer>
        <item-list
          v-if="sortedItems.length > 0"
          :items="sortedItems"
        />

        <div
          v-else
          class="items__note"
        >
          アイテムが登録されていません。<br>
          アイテム追加より登録して下さい。
        </div>

        <template #footer>
          <v-ons-button
            modifier="cta rounded red"
            @click="goToItemsNew"
          >
            <img src="@/assets/images/red-cross.png">
            アイテム追加
          </v-ons-button>
        </template>
      </content-with-footer>
    </div>
  </v-ons-page>
</template>

<script>
// components
import ContentWithFooter from '@/components/organisms/content-with-footer';
import ItemList from '@/components/organisms/item-list';

// pages
import ItemsNewView from '@/views/items/new';

export default {
  name: 'ItemsIndex',
  components: {
    ContentWithFooter,
    ItemList,
  },
  computed: {
    sortedItems() {
      const items = this.$store.getters['models/item/all'];
      const userItems = items.filter(item => item.userId !== null);
      const consoleItems = items.filter(item => item.userId === null);

      userItems.sort((a, b) => b.id - a.id);
      consoleItems.sort((a, b) => a.id - b.id);

      return userItems.concat(consoleItems);
    },
    isLoading() {
      return this.$store.getters['models/item/isLoading'];
    },
  },
  methods: {
    async show() {
      await this.$store.dispatch('models/item/getItems');
    },
    goToItemsNew() {
      this.$store.dispatch('menuNavigator/push', ItemsNewView);
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ {
  .page__background {
    background-image: none;
  }

  .content-with-footer {
    &__content {
      position: relative;
    }

    &__footer {
      display: flex;
      justify-content: flex-end;
    }

    .button {
      display: flex;
      align-items: center;
      margin-right: 20px;
    }
  }
}

.items__note {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  transform: translate(-50%, -50%);
}
</style>
