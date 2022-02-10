<template>
  <v-ons-page @show="show">
    <loading :visible="isLoading" />
    <custom-toolbar title="キャンプ場詳細">
      <template #right>
        <favorite-campsite :campsite="campsite" />
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
import FavoriteCampsite from '@/components/organisms/campsites/favorite';

// tab contents
import CampsiteForecastTab from '@/components/organisms/campsites/forecast-tab';
import CampsiteRainyTab from '@/components/organisms/campsites/rainy';
import CampsiteInformationTab from '@/components/organisms/campsites/information-tab';

export default {
  name: 'Campsitehow',
  components: {
    CardWithTab,
    ContentWithFooter,
    CampsiteName,
    FavoriteCampsite,
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
          component: CampsiteRainyTab,
        },
        {
          label: '施設詳細',
          component: CampsiteInformationTab,
        },
      ],
    };
  },
  computed: {
    activeIndexTab() {
      return this.$store.state.components.cardWithTab.showCampsiteActiveIndex;
    },
    isLoading() {
      return this.$store.getters['models/usersFavorite/isLoading'];
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
      this.$store.dispatch('appTabbar/setLastVisitedAt', this.$helpers.localDateWithHyphenFrom(new Date()));
      await this.$store.dispatch('models/usersFavorite/getUsersFavorites');
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
