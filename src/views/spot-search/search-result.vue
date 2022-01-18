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
      <campsite-list
        v-if="campsites.length > 0"
        :campsites="campsites"
        @click="goToSearchSpotByCampsite"
      />
    </div>
  </v-ons-page>
</template>

<script>
// components
import CampsiteList from '@/components/organisms/campsite-list';

export default {
  components: {
    CampsiteList,
  },
  props: {
    campsite: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      campsites: [
        {
          id: 1,
          name: '〇〇〇キャンプ場',
          address: 'キャンプ場キャンプ場〇〇〇',
          latitude: 1,
          longitude: 1,
          isFavorited: false,
          distance: 999,
        },
        {
          id: 2,
          name: 'セブンイレブン',
          address: 'キャンプ場キャンプ場〇〇〇',
          latitude: 2,
          longitude: 2,
          isFavorited: true,
          distance: 999,
        },
        {
          id: 3,
          name: 'セブンイレブン',
          address: 'キャンプ場キャンプ場〇〇〇',
          latitude: 3,
          longitude: 3,
          isFavorited: false,
          distance: 999,
        },
        {
          id: 4,
          name: 'セブンイレブン',
          address: 'キャンプ場キャンプ場〇〇〇',
          latitude: 4,
          longitude: 4,
          isFavorited: true,
          distance: 999,
        },
        {
          id: 5,
          name: 'セブンイレブン',
          address: 'キャンプ場キャンプ場〇〇〇',
          latitude: 5,
          longitude: 5,
          isFavorited: false,
          distance: 999,
        },
        {
          id: 6,
          name: 'セブンイレブン',
          address: 'キャンプ場キャンプ場〇〇〇',
          latitude: 6,
          longitude: 6,
          isFavorited: true,
          distance: 999,
        },
        {
          id: 7,
          name: 'セブンイレブン',
          address: 'キャンプ場キャンプ場〇〇〇',
          latitude: 7,
          longitude: 7,
          isFavorited: false,
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
