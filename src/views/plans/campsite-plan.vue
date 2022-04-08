<template>
  <v-ons-page @show="show">
    <custom-toolbar title="計画一覧" />
    <loading :visible="isLoading" />
    <div class="content">
      <v-ons-col class="text">
        <v-ons-row class="text__desc">
          {{ campsite.name }}
        </v-ons-row>
      </v-ons-col>

      <v-ons-card>
        <v-ons-button
          class="button--red button--more button--more__description"
          @click="goToNewPlan"
        >
          <img
            :src="require('@/assets/images/form/icon-add.png')"
            class="icon-add"
          >
          新規計画の追加
        </v-ons-button>

        <time-plan
          :future-plans="displayedFuturePlans"
          :past-plans="displayedPastPlans"
        />
      </v-ons-card>

      <confirm-dialog
        :is-shown.sync="isConfirmDialogVisible"
        @clickConfirm="goToPurchase"
      >
        <template #title>
          拡張機能
        </template>
        <template #message>
          プレミアムサービスにご登録いただくことで、予定を複数作成することができます。
        </template>
        <template #confirmAction>
          プレミアムへ
        </template>
      </confirm-dialog>
    </div>
  </v-ons-page>
</template>

<script>
import TimePlan from '@/components/organisms/plan/time-plan';
import NewPlanPage from '@/views/plans/new';
import ConfirmDialog from '@/components/organisms/dialog/confirm-dialog';
import InformationPurchase from '@/views/purchase-information/index.vue';

import moment from 'moment';

export default {
  components: {
    TimePlan,
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
      isConfirmDialogVisible: false,
    };
  },
  computed: {
    futurePlans() {
      const plans = this.$store.getters['models/userCampsitePlan/inFuture']({ campsiteId: this.campsite.id });

      return plans.sort(
        (a, b) => (moment(a.startedDate).isBefore(b.startedDate) ? -1 : 1),
      );
    },
    pastPlans() {
      const plans = this.$store.getters['models/userCampsitePlan/inPast']({ campsiteId: this.campsite.id });

      return plans.sort(
        (a, b) => (moment(a.startedDate).isAfter(b.startedDate) ? -1 : 1),
      );
    },
    displayedFuturePlans() {
      if (!this.futurePlans.length) return [];

      const oldestPlan = this.futurePlans[0];
      return this.isPurchased ? this.futurePlans : [oldestPlan];
    },
    displayedPastPlans() {
      if (!this.pastPlans.length) return [];

      const newestPlan = this.pastPlans[0];
      return this.isPurchased ? this.pastPlans : [newestPlan];
    },
    isLoading() {
      return this.$store.getters['purchase/isLoading'];
    },
    isPurchased() {
      return this.$store.getters['purchase/isPurchased'];
    },
  },
  methods: {
    goToNewPlan() {
      const isShowPremium = !this.isPurchased && this.futurePlans.length;
      if (isShowPremium) {
        this.showConfirmDialog();
        return;
      }

      this.$store.dispatch('plansNavigator/push', {
        extends: NewPlanPage,
        onsNavigatorProps: {
          campsite: this.campsite,
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
      this.$store.dispatch('plansNavigator/push', InformationPurchase);

      this.closeConfirmDialog();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/_variables.scss";

/deep/ {
  .card {
    text-align: center;
  }

  .text {
    display: grid;
    justify-content: center;
    background-color: #fff;

    &__desc {
      padding: 10px;
      font-size: 18px;
    }
  }
}
</style>
