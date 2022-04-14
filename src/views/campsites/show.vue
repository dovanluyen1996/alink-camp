<template>
  <v-ons-page @show="show">
    <custom-toolbar title="キャンプ場詳細">
      <template #right>
        <favorite-campsite :campsite="campsite" />
      </template>
    </custom-toolbar>
    <loading :visible="isLoading" />
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
          <v-ons-button
            modifier="cta rounded red"
            @click="goToNewPlan"
          >
            <img
              class="add-plan-icon"
              src="@/assets/images/red-cross.png"
              width="20px"
              height="20px"
            >
            計画の追加
          </v-ons-button>
        </template>

        <confirm-dialog
          :is-shown.sync="isConfirmDialogVisible"
          @clickConfirm="goToPurchase"
        >
          <template #title>
            拡張機能
          </template>
          <template #message>
            キャンプ天気会員にご登録いただくことで、予定を複数作成することができます。
          </template>
          <template #confirmAction>
            会員登録へ
          </template>
        </confirm-dialog>
      </content-with-footer>
    </div>
  </v-ons-page>
</template>

<script>
import settings from '@/config/settings';

// components
import CardWithTab from '@/components/organisms/card-with-tab';
import ContentWithFooter from '@/components/organisms/content-with-footer';
import CampsiteName from '@/components/organisms/campsite-name';
import FavoriteCampsite from '@/components/organisms/campsites/favorite';
import InformationPurchase from '@/views/purchase-information/index.vue';
import ConfirmDialog from '@/components/organisms/dialog/confirm-dialog';

// tab contents
import CampsiteForecastTab from '@/components/organisms/campsites/forecast-tab';
import CampsiteRainyTab from '@/components/organisms/campsites/rainy';
import CampsiteInformationTab from '@/components/organisms/campsites/information-tab';

// pages
import PlanIndexPage from '@/views/plans/index';
import NewPlanPage from '@/views/plans/new';

import moment from 'moment';

export default {
  name: 'Campsitehow',
  components: {
    CardWithTab,
    ContentWithFooter,
    CampsiteName,
    FavoriteCampsite,
    ConfirmDialog,
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
      isConfirmDialogVisible: false,
    };
  },
  computed: {
    activeIndexTab() {
      return this.$store.state.components.cardWithTab.showCampsiteActiveIndex;
    },
    isLoading() {
      return this.$store.getters['campsite/isLoading']
        || this.$store.getters['models/usersFavorite/isLoading']
        || this.$store.getters['purchase/isLoading']
        || this.$store.getters['models/weather/isForecastYearlyWeatherRateLoading']
        || this.$store.getters['models/weather/isForecast14DaysLoading']
        || this.$store.getters['models/weather/isForecastHourlyLoading']
        || this.$store.getters['models/weather/isForecastMonthlyPrecipLoading']
        || this.$store.getters['models/weather/isForecastMonthlyTempLoading']
        || this.$store.getters['models/weather/isForecastYearlyTempLoading'];
    },
    futurePlans() {
      const plans = this.$store.getters['models/userCampsitePlan/inFuture']({ campsiteId: this.campsite.id });

      return plans.sort(
        (a, b) => (moment(a.startedDate).isBefore(b.startedDate) ? -1 : 1),
      );
    },
    isPurchased() {
      return this.$store.getters['purchase/isPurchased'];
    },
  },
  watch: {
    activeIndexTab() {
      if (this.activeIndexTab === 1) {
        const params = `lat=${this.campsite.latitude}&lon=${this.campsite.longitude}`;
        this.$helpers.openPageByUrl(`${process.env.MAP_URL}?${params}`);
      }
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

      await this.getCampsite();
      await this.getUserCampsitePlans();
      await this.getUsersFavorites();
    },
    async getCampsite() {
      await this.$store.dispatch('campsite/getChoosenCampsite', this.campsite.id);
    },
    async getUserCampsitePlans() {
      await this.$store.dispatch('models/userCampsitePlan/getUserCampsitePlans', { campsite_id: this.campsite.id });
    },
    async getUsersFavorites() {
      await this.$store.dispatch('models/usersFavorite/getUsersFavorites');
    },
    goToNewPlan() {
      const isShowPremium = !this.isPurchased && this.futurePlans.length;
      if (isShowPremium) {
        this.showConfirmDialog();
        return;
      }

      this.$store.commit('plansNavigator/setEnableBusy', false);
      this.$store.commit('appTabbar/setActiveIndex', settings.views.appTabbar.tabIndexes.plans);
      this.$store.dispatch('plansNavigator/reset', PlanIndexPage);

      this.$store.dispatch('plansNavigator/push', {
        extends: NewPlanPage,
        onsNavigatorProps: {
          campsite: this.campsite,
        },
        onsNavigatorOptions: {
          callback: () => {
            this.$store.commit('plansNavigator/setEnableBusy', true);
          },
        },
      });
    },
    showConfirmDialog() {
      this.isConfirmDialogVisible = true;
    },
    closeConfirmDialog() {
      this.isConfirmDialogVisible = false;
    },
    goToPurchase() {
      this.$store.commit('plansNavigator/setEnableBusy', false);
      this.$store.commit('appTabbar/setActiveIndex', settings.views.appTabbar.tabIndexes.plans);
      this.$store.dispatch('plansNavigator/reset', PlanIndexPage);

      this.$store.dispatch('plansNavigator/push', {
        extends: InformationPurchase,
        onsNavigatorOptions: {
          callback: () => {
            this.$store.commit('plansNavigator/setEnableBusy', true);
          },
        },
      });

      this.closeConfirmDialog();
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
      padding-right: 10px;
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

  .add-plan-icon {
    margin-right: 10px;
  }
}
</style>
