<template>
  <v-ons-page @show="show">
    <loading :visible="isLoading" />
    <custom-toolbar title="キャンプ場詳細">
      <template #right>
        <img
          v-if="isFavorite"
          src="@/assets/images/bookmark.png"
        >
        <img
          v-else
          src="@/assets/images/gray-bookmark.png"
        >
      </template>
    </custom-toolbar>
    <div class="content">
      <content-with-footer>
        <campsite-name :campsite-name="campsite.name" />

        <div class="campsite-show">
          <card-with-tab
            :tabs="tabs"
            :active-index="activeIndexTab"
            class="custom-card"
            @switchTab="switchTab"
          />
        </div>

        <template #footer>
          <v-ons-button modifier="cta rounded red">
            <img class="mr-10" src="@/assets/images/red-cross.png">
            計画の追加
          </v-ons-button>
        </template>
      </content-with-footer>
    </div>
  </v-ons-page>
</template>

<script>
// components
import CardWithTab from '@/components/organisms/card-with-tab';
import ContentWithFooter from '@/components/organisms/content-with-footer';
import CampsiteName from '@/components/organisms/campsite-name';

// tab contents
import CampsiteForecastTab from '@/components/organisms/campsites/forecast-tab';

export default {
  name: 'Campsitehow',
  components: {
    CardWithTab,
    ContentWithFooter,
    CampsiteName,
  },
  props: {
    campsite: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tabs: [
        {
          label: '天気予報詳細',
          component: CampsiteForecastTab,
        },
        {
          label: '雨雲の動き',
          component: CampsiteForecastTab,
        },
        {
          label: '施設詳細',
          component: CampsiteForecastTab,
        },
      ],
      isFavorite: true,
    };
  },
  computed: {
    activeIndexTab() {
      return this.$store.state.components.cardWithTab.showCampsiteActiveIndex;
    },
    isLoading() {
      return this.$store.getters['campsite/isLoading'];
    },
  },
  created() {
    this.resetCardWithTab();
  },
  methods: {
    switchTab(index) {
      this.$store.commit('components/cardWithTab/setShowCampsiteActiveIndex', index);
    },
    resetCardWithTab() {
      this.$store.commit('components/cardWithTab/resetShowCampsiteActiveIndex');
    },
    async show() {
      await this.getCampsite();
    },
    async getCampsite() {
      await this.$store.dispatch('campsite/getChoosenCampsite', this.campsite.id);
    },
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_variables.scss";

/deep/ {
  .toolbar {
    &__right {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      img {
        margin-right: 10px;
      }
    }
  }

  .content-with-footer {
    &__footer {
      display: flex;
      justify-content: flex-end;

      .button {
        display: flex;
        align-items: center;
        padding: 5px 15px;
        margin-right: 20px;
      }
    }
  }

  .mr-10 {
    margin-right: 10px;
  }
}
</style>
