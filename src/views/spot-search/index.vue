<template>
  <v-ons-page>
    <custom-toolbar
      title="周辺検索"
      :disabled-back-button="true"
    />

    <div class="content">
      <div class="spot-search__top">
        <v-ons-button
          modifier="primary"
          @click="goToSpotSearchByCurrentLocation"
        >
          <img src="@/assets/images/location.png">
          現在位置より検索
        </v-ons-button>
        <div class="spot-search__text">
          予定日、またはお気に入り設定中のキャンプ場
        </div>
      </div>
      <!-- TODO: When implement Logic, please use Loading in Store  -->
      <!-- <loading :visible="isLoading" /> -->
      <campsite-list
        v-if="campsites.length > 0"
        :is-show-favorite-mark="true"
        :campsites="campsites"
        :has-chevron="false"
        @click="goToSearchSpotByCampsite"
      />

      <v-ons-card
        v-else
        class="spot-search__note"
      >
        <p>
          まだお気に入りや予定日設定して <br>
          いるキャンプ場がありません。キャンプ場検索 <br>
          より、設定してください
        </p>
        <v-ons-button
          modifier="search"
          @click="goToSearchCampsite"
        >
          <img src="@/assets/images/form/search-top.png">
          キャンプ場検索
        </v-ons-button>
      </v-ons-card>
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
        },
        {
          id: 2,
          name: '〇〇〇キャンプ場',
          address: 'キャンプ場キャンプ場〇〇〇',
          latitude: 2,
          longitude: 2,
          isFavorited: true,
        },
        {
          id: 3,
          name: '〇〇〇キャンプ場',
          address: 'キャンプ場キャンプ場〇〇〇',
          latitude: 3,
          longitude: 3,
          isFavorited: false,
        },
        {
          id: 4,
          name: '〇〇〇キャンプ場',
          address: 'キャンプ場キャンプ場〇〇〇',
          latitude: 4,
          longitude: 4,
          isFavorited: true,
        },
        {
          id: 5,
          name: '〇〇〇キャンプ場',
          address: 'キャンプ場キャンプ場〇〇〇',
          latitude: 5,
          longitude: 5,
          isFavorited: false,
        },
        {
          id: 6,
          name: '〇〇〇キャンプ場',
          address: 'キャンプ場キャンプ場〇〇〇',
          latitude: 6,
          longitude: 6,
          isFavorited: true,
        },
        {
          id: 7,
          name: '〇〇〇キャンプ場',
          address: 'キャンプ場キャンプ場〇〇〇',
          latitude: 7,
          longitude: 7,
          isFavorited: false,
        },
      ],
    };
  },
  methods: {
    goToSearchSpotByCampsite() {
      // TODO: Redirect to Campsite
    },
    goToSpotSearchByCurrentLocation() {
      // TODO: Redirect to Current Location
    },
    goToSearchCampsite() {
      // TODO: implement redirect to キャンプ場検索 when implement Logic
    },
  },
};
</script>

<style lang="scss" scoped>
.spot-search {
  &__top {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100px;
    margin: 30px 0 10px 0;
  }

  &__text {
    font-size: 14px;
    font-weight: 600;
  }

  &__note {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 458px;
    text-align: center;

    & > p {
      margin-bottom: 20px;
      font-size: 18px;
      font-weight: 600;
      color: #000;
    }
  }
}

/deep/ {
  .button--primary {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 10px 20px;
    background: #ffc134;

    & > img {
      margin-right: 10px;
    }
  }

  .button--search {
    display: flex;
    align-items: center;
  }

  .list-item {
    border-bottom: 1px solid #d9d9d9;

    &__title {
      font-weight: 300;
    }

    &__subtitle {
      font-weight: 300;
      color: #00000080;
    }
  }
}
</style>
