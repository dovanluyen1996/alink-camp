<template>
  <v-ons-page @show="show">
    <!-- <loading :visible="isLoading" /> -->
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
        <div class="text">
          <v-ons-row class="text__desc">
            〇〇〇〇〇〇〇〇〇〇〇〇<br>〇〇〇〇〇〇〇〇〇〇〇〇キャンズ場
          </v-ons-row>
        </div>

        <div class="campsite-show">
          <card-with-tab
            :tabs="tabs"
            :active-index="activeIndexTab"
            :class="{'custom-card': activeIndexTab === 0}"
            @switchTab="switchTab"
          />
        </div>

        <template #footer>
          <v-ons-button modifier="cta rounded red">
            <img src="@/assets/images/red-cross.png">
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

// tab contents
import CampsiteForecastTab from '@/components/organisms/campsites/forecast-tab';

export default {
  name: 'Campsitehow',
  components: {
    CardWithTab,
    ContentWithFooter,
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
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_variables.scss";

/deep/ {
  .text {
    display: grid;
    justify-content: center;
    background-color: $color-white;

    &__desc {
      padding: 15px;
      font-size: 18px;
    }
  }

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
    }

    .button {
      display: flex;
      align-items: center;
      padding: 5px 15px;
      margin-right: 20px;

      img {
        margin-right: 5px;
      }
    }
  }
}
</style>
