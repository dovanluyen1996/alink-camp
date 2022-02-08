<template>
  <v-ons-page @show="show">
    <custom-toolbar title="キャンプ場検索" />

    <div class="content">
      <content-with-footer>
        <search-field
          v-model="searchText"
          @searched="goToCampsiteSearchResult"
        />
        <campsite-list
          v-if="campsites.length > 0"
          :campsites="campsites"
          :has-chevron="false"
          title="閲覧履歴"
          @click="goToCampsiteShow"
        />
      </content-with-footer>
    </div>
  </v-ons-page>
</template>

<script>
// components
import SearchField from '@/components/organisms/form/search-field.vue';
import CampsiteShow from '@/views/campsites/show';
import CampsiteList from '@/components/organisms/campsite-list';
import ContentWithFooter from '@/components/organisms/content-with-footer';

export default {
  name: 'CampsiteSearch',
  components: {
    SearchField,
    CampsiteList,
    ContentWithFooter,
  },
  data() {
    return {
      searchText: '',
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
    goToCampsiteSearchResult() {
      // TODO: handle go to campsite search
      // Console data when search success, please remove them when implement goto campsite search
      console.log(this.$store.getters['models/campsite/all']);
      console.log(this.$store.getters['models/campsite/totalCount']);
    },
    goToCampsiteShow(campsite) {
      this.$store.dispatch('campsiteSearchNavigator/push', {
        extends: CampsiteShow,
        onsNavigatorProps: {
          campsite,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content-with-footer {
  .button {
    width: 150px;
  }
}
</style>
