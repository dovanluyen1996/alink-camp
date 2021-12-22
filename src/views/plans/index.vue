<template>
  <v-ons-page>
    <custom-toolbar title="キャンプ計画" />
    <div class="content">
      <!-- TODO: When implement Logic, plase use Loading in Store  -->
      <!-- <loading :visible="isLoading" /> -->
      <no-data v-if="campsites.length === 0">
        <p>
          まだお気に入りや予定日設定して<br>
          いるコースがありません。コース検索より、設定してください
        </p>
        <template #actions>
          <v-ons-button
            class="button--red button--search button--search__description"
            @click="goToPlanSearch"
          >
            <img
              :src="require('@/assets/images/form/search-top.png')"
            >
            キャンプ場検索
          </v-ons-button>
        </template>
      </no-data>

      <campsite-list v-else
        :isShowFavoriteMark="true"
        :campsites="campsites"
        @click="goToPlanDetail"
      />
    </div>
  </v-ons-page>
</template>

<script>
// components
import NoData from '@/components/organisms/no-data';
import CampsiteList from '@/components/organisms/campsite-list';

// page
import CampsitePlan from '@/views/plans/campsite-plan';

//page
import ListPlan from './list-plan';

export default {
  name: 'CampsitesIndex',
  components: {
    NoData,
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
    goToPlanSearch() {
      // TODO: Redirect to Plan Search
    },
    goToPlanDetail() {
      this.$store.dispatch('plansNavigator/push', CampsitePlan);
    },
  },
};
</script>
