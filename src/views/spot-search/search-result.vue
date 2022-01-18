<template>
  <v-ons-page>
    <custom-toolbar title="周辺検索" />

    <div class="content">
      <div
        v-if="campsite"
        class="search-result__campsite"
      >
        <p class="search-result__campsite-name">
          {{ campsite.name }}
        </p>
      </div>
      <!-- TODO: When implement Logic, please use Loading in Store  -->
      <!-- <loading :visible="isLoading" /> -->
      <spot-list
        v-if="spot.length > 0"
        :spot="spot"
      />
    </div>
  </v-ons-page>
</template>

<script>
// components
import SpotList from '@/components/organisms/spot-list';

export default {
  components: {
    SpotList,
  },
  props: {
    campsite: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      spot: [
        {
          id: 1,
          name: 'セブンイレブン',
          address: 'キャンプ場キャンプ場〇〇〇',
          distance: 999,
        },
        {
          id: 2,
          name: 'セブンイレブン',
          address: 'キャンプ場キャンプ場〇〇〇',
          distance: 999,
        },
        {
          id: 3,
          name: 'セブンイレブン',
          address: 'キャンプ場キャンプ場〇〇〇',
          distance: 999,
        },
        {
          id: 4,
          name: 'セブンイレブン',
          address: 'キャンプ場キャンプ場〇〇〇',
          distance: 999,
        },
        {
          id: 5,
          name: 'セブンイレブン',
          address: 'キャンプ場キャンプ場〇〇〇',
          distance: 999,
        },
        {
          id: 6,
          name: 'セブンイレブン',
          address: 'キャンプ場キャンプ場〇〇〇',
          distance: 999,
        },
        {
          id: 7,
          name: 'セブンイレブン',
          address: 'キャンプ場キャンプ場〇〇〇',
          distance: 999,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.search-result {
  &__campsite {
    padding: 5px 20px;
    background-color: #fff;
  }

  &__campsite-name {
    margin-left: 20px;
    font-size: 18px;
    font-weight: 300;
  }
}

/deep/ {
  .list-item {
    border-bottom: 1px solid #d9d9d9;

    &__title {
      font-size: 18px;
      font-weight: 300;
    }

    &__subtitle {
      font-weight: 300;
      color: #00000080;
    }
  }
}
</style>
